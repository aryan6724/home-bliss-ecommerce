import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import Product from "@/models/Product";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function PATCH(request: Request, { params }: RouteProps) {
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

    const { id } = await params;
    const body = await request.json();

    const updateData = {
      name: String(body.name || "").trim(),
      slug: body.slug ? createSlug(String(body.slug)) : "",
      category: String(body.category || "").trim(),
      price: Number(body.price),
      image: String(body.image || "").trim(),
      badge: String(body.badge || "New").trim(),
      description: String(body.description || "").trim(),
      material: String(body.material || "").trim(),
      delivery: String(body.delivery || "").trim(),
      showOnHome: Boolean(body.showOnHome),
      stock: Number(body.stock || 0),
      isActive:
        typeof body.isActive === "boolean" ? body.isActive : true,
    };

    if (
      !updateData.name ||
      !updateData.slug ||
      !updateData.category ||
      !updateData.image ||
      !updateData.description ||
      !updateData.material ||
      !updateData.delivery
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required product fields must be filled",
        },
        { status: 400 }
      );
    }

    if (!updateData.price || updateData.price <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product price must be greater than 0",
        },
        { status: 400 }
      );
    }

    const existingSlugProduct = await Product.findOne({
      slug: updateData.slug,
      _id: { $ne: id },
    });

    if (existingSlugProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Another product with this slug already exists",
        },
        { status: 409 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
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

    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}