"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Message = {
  _id: string;
  messageId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: string;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingMessageId, setUpdatingMessageId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setError("");

      const response = await fetch("/api/messages");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data.messages);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching messages."
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      setUpdatingMessageId(messageId);

      const response = await fetch(`/api/messages/${messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Read",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update message");
      }

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.messageId === messageId
            ? { ...message, status: "Read" }
            : message
        )
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating message."
      );
    } finally {
      setUpdatingMessageId("");
    }
  };

  const deleteMessage = async (messageId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      setUpdatingMessageId(messageId);

      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete message");
      }

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.messageId !== messageId)
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting message."
      );
    } finally {
      setUpdatingMessageId("");
    }
  };

  const stats = useMemo(() => {
    const newMessages = messages.filter(
      (message) => message.status === "New"
    ).length;

    const readMessages = messages.filter(
      (message) => message.status === "Read"
    ).length;

    return {
      total: messages.length,
      newMessages,
      readMessages,
    };
  }, [messages]);

  const formatDate = (message: Message) => {
    if (message.date) return message.date;

    if (message.createdAt) {
      return new Date(message.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    return "Not available";
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Admin Support
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Customer Messages
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              Manage customer enquiries, support requests and contact messages
              submitted from the store.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/admin"
              className="inline-flex min-w-[150px] items-center justify-center rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/"
              className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              ← Back to Store
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Loading messages...</h2>
          </div>
        ) : error ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold text-red-600">
              Failed to load messages.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">{error}</p>

            <button
              onClick={fetchMessages}
              className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-7 shadow-sm">
                <p className="text-sm text-neutral-500">Total Messages</p>

                <h2 className="mt-3 text-4xl font-semibold">
                  {stats.total}
                </h2>
              </div>

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">
                <p className="text-sm text-neutral-500">New Messages</p>

                <h2 className="mt-3 text-4xl font-semibold">
                  {stats.newMessages}
                </h2>
              </div>

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">
                <p className="text-sm text-neutral-500">Read Messages</p>

                <h2 className="mt-3 text-4xl font-semibold">
                  {stats.readMessages}
                </h2>
              </div>
            </div>

            <section className="mt-12 rounded-[3rem] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold">Inbox</h2>

                  <p className="mt-2 text-neutral-500">
                    Latest customer messages appear here.
                  </p>
                </div>

                <button
                  onClick={fetchMessages}
                  className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
                >
                  Refresh
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="mt-8 rounded-[2rem] bg-[#f5f5f7] p-10 text-center">
                  <h3 className="text-2xl font-semibold">
                    No messages found.
                  </h3>

                  <p className="mt-3 text-neutral-500">
                    Customer messages will appear here after users submit the
                    contact form.
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-5">
                  {messages.map((message) => {
                    const isNew = message.status === "New";
                    const isUpdating =
                      updatingMessageId === message.messageId;

                    return (
                      <div
                        key={message._id}
                        className={`rounded-[2rem] border p-6 transition ${
                          isNew
                            ? "border-black bg-[#f5f5f7]"
                            : "border-neutral-200 bg-white"
                        }`}
                      >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-2xl font-semibold">
                                {message.name}
                              </h3>

                              <span
                                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                                  isNew
                                    ? "bg-black text-white"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {message.status}
                              </span>
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                              <div className="rounded-[1.5rem] bg-white p-5">
                                <p className="text-sm font-semibold text-black">
                                  Contact Details
                                </p>

                                <div className="mt-3 space-y-2 text-sm text-neutral-600">
                                  <p>
                                    Email:{" "}
                                    <span className="font-semibold text-black">
                                      {message.email}
                                    </span>
                                  </p>

                                  <p>
                                    Phone:{" "}
                                    <span className="font-semibold text-black">
                                      {message.phone}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="rounded-[1.5rem] bg-white p-5">
                                <p className="text-sm font-semibold text-black">
                                  Message Details
                                </p>

                                <div className="mt-3 space-y-2 text-sm text-neutral-600">
                                  <p>
                                    Date:{" "}
                                    <span className="font-semibold text-black">
                                      {formatDate(message)}
                                    </span>
                                  </p>

                                  <p>
                                    ID:{" "}
                                    <span className="font-semibold text-black">
                                      {message.messageId}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-5 rounded-[1.5rem] bg-white p-5">
                              <p className="mb-2 text-sm font-semibold text-black">
                                Message
                              </p>

                              <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-700">
                                {message.message}
                              </p>
                            </div>
                          </div>

                          <div className="flex w-full flex-col gap-3 lg:w-[200px]">
                            {isNew && (
                              <button
                                onClick={() => markAsRead(message.messageId)}
                                disabled={isUpdating}
                                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isUpdating ? "Updating..." : "Mark as Read"}
                              </button>
                            )}

                            <a
                              href={`mailto:${message.email}`}
                              className="rounded-full border border-black px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                            >
                              Reply Email
                            </a>

                            <button
                              onClick={() => deleteMessage(message.messageId)}
                              disabled={isUpdating}
                              className="rounded-full border border-red-500 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? "Please wait..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}