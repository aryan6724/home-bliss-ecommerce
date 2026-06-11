import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import Message from "@/models/Message";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{
    messageId: string;
  }>;
};

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

    const { messageId } = await params;
    const body = await request.json();

    const updatedMessage = await Message.findOneAndUpdate(
      { messageId },
      { status: body.status },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: updatedMessage,
    });
  } catch (error) {
    console.error("UPDATE MESSAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update message",
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

    const { messageId } = await params;

    const deletedMessage = await Message.findOneAndDelete({ messageId });

    if (!deletedMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}