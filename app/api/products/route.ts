import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import Product from "@/models/Product";

export const runtime = "nodejs";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const isAdminRequest = searchParams.get("admin") === "true";

    if (isAdminRequest) {
      const isAdmin = await isAdminAuthenticated();

      if (!isAdmin) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized access",
          },
          { status: 401 }
        );
      }

      const products = await Product.find().sort({ createdAt: -1 });

      return NextResponse.json({
        success: true,
        products,
      });
    }

    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isAdminAuthenticated();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const price = Number(body.price);
    const image = String(body.image || "").trim();
    const badge = String(body.badge || "New").trim();
    const description = String(body.description || "").trim();
    const material = String(body.material || "").trim();
    const delivery = String(body.delivery || "").trim();
    const stock = Number(body.stock || 0);
    const showOnHome = Boolean(body.showOnHome);
    const isActive =
      typeof body.isActive === "boolean" ? body.isActive : true;

    const slug = body.slug ? createSlug(String(body.slug)) : createSlug(name);

    if (
      !name ||
      !slug ||
      !category ||
      !image ||
      !description ||
      !material ||
      !delivery
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required product fields must be filled",
        },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product price must be greater than 0",
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Stock must be a valid number",
        },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product slug already exists",
        },
        { status: 409 }
      );
    }

    const newProduct = await Product.create({
      name,
      slug,
      category,
      price,
      image,
      badge,
      description,
      material,
      delivery,
      showOnHome,
      stock,
      isActive,
    });

    return NextResponse.json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}