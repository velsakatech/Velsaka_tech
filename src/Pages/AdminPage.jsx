import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import Swal from "sweetalert2";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { api } from "../api/client.js";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import {
  Search,
  Trash2,
  Users,
  RefreshCw,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  Archive,
  X,
  UserPlus,
  Inbox,
  Rocket,
  Send,
  Phone,
  AtSign,
  Briefcase,
  Copy,
  Check,
  Loader2,
  Heart,
  LayoutDashboard,
  Shield,
  TrendingUp,
  Crown,
  Star,
  Download,
  FileSpreadsheet,
} from "lucide-react";

// =========================================================
// CONFIG
// =========================================================

const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || "velsaka-tech@gmail.com"
)
  .trim()
  .toLowerCase();

// =========================================================
// CSV EXPORT UTILITY
// =========================================================

const convertToCSV = (data, headers) => {
  if (!data || !data.length) return "";

  const headerRow = headers.map((h) => `"${h.label}"`).join(",");

  const rows = data.map((item) =>
    headers
      .map((h) => {
        let value = item[h.key];

        if (value === null || value === undefined) {
          value = "";
        }

        if (h.key === "createdAt" && value) {
          value = new Date(value).toLocaleString("en-US");
        }

        value = String(value).replace(/"/g, '""');

        return `"${value}"`;
      })
      .join(",")
  );

  return [headerRow, ...rows].join("\n");
};

const downloadCSV = (csvContent, filename) => {
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

// =========================================================
// DEBOUNCED SEARCH
// =========================================================

const useDebouncedSearch = (searchTerm, delay = 300) => {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return debouncedSearch;
};

// =========================================================
// SCROLL TO TOP
// =========================================================

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group animate-bounce"
    >
      <ArrowUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
    </button>
  );
};

// =========================================================
// STAT CARD (BRIGHT)
// =========================================================

const ModernStatCard = ({ title, value, icon: Icon, trend, subtitle, color }) => {
  const themes = {
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      border: "border-indigo-200",
      iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      text: "text-indigo-700",
      subtext: "text-indigo-500",
      glow: "group-hover:shadow-indigo-200",
      trendColor: "text-indigo-600",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-purple-100",
      border: "border-purple-200",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      text: "text-purple-700",
      subtext: "text-purple-500",
      glow: "group-hover:shadow-purple-200",
      trendColor: "text-purple-600",
    },
    emerald: {
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      border: "border-emerald-200",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      text: "text-emerald-700",
      subtext: "text-emerald-500",
      glow: "group-hover:shadow-emerald-200",
      trendColor: "text-emerald-600",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-50 to-amber-100",
      border: "border-amber-200",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
      text: "text-amber-700",
      subtext: "text-amber-500",
      glow: "group-hover:shadow-amber-200",
      trendColor: "text-amber-600",
    },
    rose: {
      bg: "bg-gradient-to-br from-rose-50 to-rose-100",
      border: "border-rose-200",
      iconBg: "bg-gradient-to-br from-rose-500 to-rose-600",
      text: "text-rose-700",
      subtext: "text-rose-500",
      glow: "group-hover:shadow-rose-200",
      trendColor: "text-rose-600",
    },
    cyan: {
      bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
      border: "border-cyan-200",
      iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      text: "text-cyan-700",
      subtext: "text-cyan-500",
      glow: "group-hover:shadow-cyan-200",
      trendColor: "text-cyan-600",
    },
  };

  const theme = themes[color] || themes.indigo;

  return (
    <div
      className={`group relative overflow-hidden ${theme.bg} border ${theme.border} rounded-2xl p-6 hover:scale-105 hover:shadow-xl ${theme.glow} transition-all duration-300 cursor-pointer shadow-sm`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 ${theme.iconBg} rounded-xl shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="text-right">
            <p className={`text-3xl font-bold ${theme.text}`}>{value}</p>
            {subtitle && (
              <p className={`text-xs ${theme.subtext} mt-1 font-medium`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <p className={`text-sm font-semibold ${theme.text} mb-2`}>{title}</p>

        {trend && (
          <div className="flex items-center gap-1">
            <TrendingUp className={`w-3 h-3 ${theme.trendColor}`} />
            <span className={`text-xs font-medium ${theme.trendColor}`}>
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================
// WAITLIST MODAL (BRIGHT)
// =========================================================

const WaitlistModal = ({ entry, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(entry.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy email error:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200 p-5 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-md">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Waitlist Subscriber
              </h3>
              <p className="text-sm text-gray-500">
                Early access member • Priority updates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4" />
                Subscriber Information
              </h4>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200 text-sm flex items-center gap-2 text-gray-700"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <Mail className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <a
                    href={`mailto:${entry.email}`}
                    className="text-gray-800 hover:text-emerald-600 transition font-medium"
                  >
                    {entry.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <Calendar className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-xs text-gray-500">Joined Waitlist</p>
                  <p className="text-gray-800 font-medium">
                    {formatDate(entry.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="text-sm font-semibold text-emerald-600 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Quick Actions
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${entry.email}?subject=Welcome to VELSAKA TECH Waitlist&body=Dear subscriber,%0A%0AThank you for joining our waitlist! We're excited to have you on board. We'll notify you as soon as we launch.%0A%0ABest regards,%0AVELSAKA TECH Team`}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-2 group shadow-md"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Send Welcome Email
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 pt-2">
            <p>
              Subscriber since {new Date(entry.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// MESSAGE MODAL (BRIGHT)
// =========================================================

const MessageModal = ({ message, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(message.status || "pending");
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      const data = await api(`/api/contact/${message._id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });

      if (data.success) {
        setStatus(newStatus);
        onStatusUpdate(message._id, newStatus);

        Swal.fire({
          title: "Status Updated",
          text: `Message marked as ${newStatus}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Status update error:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update status",
        icon: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusColors = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    read: "bg-blue-100 text-blue-700 border-blue-200",
    replied: "bg-green-100 text-green-700 border-green-200",
    archived: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 p-5 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-md">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Message Details
              </h3>
              <div className="flex gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[status]}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-gray-800 font-medium">{message.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <AtSign className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-indigo-600 hover:underline text-sm font-medium"
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-gray-800">
                    {message.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500">Service</p>
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                    {message.service || "General Inquiry"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message Content
            </h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
              <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Send className="w-4 h-4" />
                Quick Actions
              </h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${message.email}?subject=Response to your ${message.service} inquiry`}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl text-center transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Reply via Email
                </a>
                <a
                  href={`https://wa.me/${
                    message.phone?.replace(/\D/g, "") || "917092085864"
                  }?text=Hi ${
                    message.fullName
                  },%0A%0AThank you for contacting VELSAKA TECH...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl text-center transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  WhatsApp Reply
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Update Status
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {["pending", "read", "replied", "archived"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusUpdate(s)}
                    disabled={status === s || updating}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      status === s
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-100 text-gray-600"
                    } disabled:opacity-50`}
                  >
                    {s === "pending" && <Clock className="w-3 h-3" />}
                    {s === "read" && <Eye className="w-3 h-3" />}
                    {s === "replied" && <CheckCircle className="w-3 h-3" />}
                    {s === "archived" && <Archive className="w-3 h-3" />}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 pt-2 border-t border-gray-100">
            <p>Received on {formatDate(message.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// MESSAGE CARD (BRIGHT)
// =========================================================

const MessageCard = ({ message, onDelete, onViewMessage, isDeleting }) => {
  const status = message.status || "pending";

  const statusConfig = {
    read: {
      icon: Eye,
      bg: "bg-blue-100",
      border: "border-blue-200",
      text: "text-blue-700",
    },
    replied: {
      icon: CheckCircle,
      bg: "bg-green-100",
      border: "border-green-200",
      text: "text-green-700",
    },
    archived: {
      icon: Archive,
      bg: "bg-gray-100",
      border: "border-gray-200",
      text: "text-gray-700",
    },
    pending: {
      icon: Clock,
      bg: "bg-amber-100",
      border: "border-amber-200",
      text: "text-amber-700",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">
      <div className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="font-semibold text-gray-800 truncate">
                  {message.email}
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border font-medium ${config.bg} ${config.text} ${config.border}`}
              >
                <StatusIcon className="w-3 h-3" />
                <span className="capitalize">{status}</span>
              </span>
            </div>

            <div
              onClick={() => onViewMessage(message)}
              className="mt-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <MessageSquare className="w-3 h-3" />
                <span>Message Preview</span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                {message.message?.length > 80
                  ? message.message.substring(0, 80) + "..."
                  : message.message || "No message content"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">
                <Calendar className="w-3 h-3" />
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">
                <Users className="w-3 h-3" />
                {message.fullName || "Unknown"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onViewMessage(message)}
              className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-200"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(message._id, message.email)}
              disabled={isDeleting}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// WAITLIST CARD (BRIGHT)
// =========================================================

const WaitlistCard = ({ entry, onView, onDelete, isDeleting }) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300">
      <div className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-1.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg">
                <UserPlus className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-semibold text-gray-800 truncate">
                {entry.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">
                <Calendar className="w-3 h-3" />
                Joined:{" "}
                {entry.createdAt
                  ? new Date(entry.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onView(entry)}
              className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-200"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(entry._id, entry.email)}
              disabled={isDeleting}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// LOADING SKELETON (BRIGHT)
// =========================================================

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse shadow-sm"
        >
          <div className="flex justify-between">
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-16 bg-gray-100 rounded w-full" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-20" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-9 h-9 bg-indigo-100 rounded-xl" />
              <div className="w-9 h-9 bg-red-100 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// =========================================================
// EMPTY STATE (BRIGHT)
// =========================================================

const EmptyState = ({ type, hasSearch, onClearSearch }) => {
  return (
    <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
      <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full animate-pulse opacity-50" />
        {type === "messages" ? (
          <Inbox className="w-14 h-14 text-indigo-400" />
        ) : (
          <Heart className="w-14 h-14 text-emerald-400" />
        )}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {hasSearch
          ? "No matching results"
          : `No ${type === "messages" ? "messages" : "waitlist entries"} yet`}
      </h3>

      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {hasSearch
          ? "Try adjusting your search terms or clear the filters"
          : type === "messages"
          ? "Contact form submissions will appear here once customers reach out"
          : "Waitlist signups will appear here when users join for early access"}
      </p>

      {hasSearch && (
        <button
          onClick={onClearSearch}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 font-medium"
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

// =========================================================
// TAB BUTTON (BRIGHT)
// =========================================================

const ModernTabButton = ({ active, onClick, icon: Icon, label, count }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200 scale-105"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {count > 0 && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
            active ? "bg-white/25 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

// =========================================================
// MAIN ADMIN PAGE
// =========================================================

export default function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [activeTab, setActiveTab] = useState("messages");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedWaitlistEntry, setSelectedWaitlistEntry] = useState(null);
  const [exporting, setExporting] = useState(false);

  const debouncedSearchTerm = useDebouncedSearch(searchTerm);

  // =======================================================
  // FIREBASE USER
  // =======================================================

  useEffect(() => {
    console.log("🔐 AdminPage: Listening for Firebase user...");

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("❌ AdminPage: No Firebase user");
        setUser(null);
        return;
      }

      const email = currentUser.email?.trim().toLowerCase();

      console.log("👤 AdminPage Firebase user:", email);

      if (email !== ADMIN_EMAIL) {
        console.log("❌ AdminPage unauthorized user:", email);
        setUser(null);
        return;
      }

      console.log("✅ AdminPage admin verified:", email);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // =======================================================
  // FETCH MESSAGES
  // =======================================================

  const fetchMessages = useCallback(async (showRefreshAnimation = false) => {
    try {
      setError(null);
      if (showRefreshAnimation) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      console.log("📨 Fetching contact messages...");
      const data = await api("/api/contact", { method: "GET" });
      console.log("📨 Contact response:", data);

      if (data.success) {
        setMessages(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch messages");
      }
    } catch (err) {
      console.error("❌ Messages fetch error:", err);
      setError(err.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // =======================================================
  // FETCH WAITLIST
  // =======================================================

  const fetchWaitlist = useCallback(
    async (showRefreshAnimation = false) => {
      try {
        setError(null);
        if (showRefreshAnimation) {
          setRefreshing(true);
        }

        console.log("👥 Fetching waitlist...");
        const data = await api("/api/waitlist", { method: "GET" });
        console.log("👥 Waitlist response:", data);

        if (data.success) {
          setWaitlist(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch waitlist");
        }
      } catch (err) {
        console.error("❌ Waitlist fetch error:", err);
        setWaitlist([]);
        if (!error) {
          setError(err.message || "Failed to fetch waitlist");
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [error]
  );

  // =======================================================
  // INITIAL FETCH
  // =======================================================

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchMessages(), fetchWaitlist()]);
      setLoading(false);
    };

    fetchAll();
  }, [fetchMessages, fetchWaitlist]);

  // =======================================================
  // FILTER MESSAGES
  // =======================================================

  const filteredMessages = useMemo(() => {
    if (!debouncedSearchTerm) return messages;
    const search = debouncedSearchTerm.toLowerCase();

    return messages.filter(
      (message) =>
        message.email?.toLowerCase().includes(search) ||
        message.fullName?.toLowerCase().includes(search) ||
        message.message?.toLowerCase().includes(search)
    );
  }, [messages, debouncedSearchTerm]);

  // =======================================================
  // FILTER WAITLIST
  // =======================================================

  const filteredWaitlist = useMemo(() => {
    if (!debouncedSearchTerm) return waitlist;
    const search = debouncedSearchTerm.toLowerCase();

    return waitlist.filter((entry) =>
      entry.email?.toLowerCase().includes(search)
    );
  }, [waitlist, debouncedSearchTerm]);

  // =======================================================
  // PAGINATION
  // =======================================================

  const paginatedMessages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMessages.slice(start, start + itemsPerPage);
  }, [filteredMessages, currentPage]);

  const paginatedWaitlist = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWaitlist.slice(start, start + itemsPerPage);
  }, [filteredWaitlist, currentPage]);

  const totalPages =
    activeTab === "messages"
      ? Math.ceil(filteredMessages.length / itemsPerPage)
      : Math.ceil(filteredWaitlist.length / itemsPerPage);

  // =======================================================
  // STATS
  // =======================================================

  const stats = {
    totalMessages: messages.length,
    pendingMessages: messages.filter((m) => m.status === "pending").length,
    totalWaitlist: waitlist.length,
    repliedMessages: messages.filter((m) => m.status === "replied").length,
    readMessages: messages.filter((m) => m.status === "read").length,
  };

  // =======================================================
  // EXPORT CSV
  // =======================================================

  const handleExportCSV = async () => {
    setExporting(true);

    try {
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "-");

      if (activeTab === "messages") {
        if (filteredMessages.length === 0) {
          Swal.fire({
            title: "No Data",
            text: "There are no messages to export.",
            icon: "info",
          });
          return;
        }

        const headers = [
          { key: "fullName", label: "Full Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "service", label: "Service" },
          { key: "message", label: "Message" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Date Received" },
        ];

        const csvContent = convertToCSV(filteredMessages, headers);
        downloadCSV(csvContent, `contact-messages-${timestamp}.csv`);
      } else {
        if (filteredWaitlist.length === 0) {
          Swal.fire({
            title: "No Data",
            text: "There are no waitlist entries to export.",
            icon: "info",
          });
          return;
        }

        const headers = [
          { key: "email", label: "Email" },
          { key: "createdAt", label: "Date Joined" },
        ];

        const csvContent = convertToCSV(filteredWaitlist, headers);
        downloadCSV(csvContent, `waitlist-subscribers-${timestamp}.csv`);
      }

      await Swal.fire({
        title: "Export Successful! 🎉",
        text: `Exported ${
          activeTab === "messages"
            ? filteredMessages.length
            : filteredWaitlist.length
        } records to CSV file.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Export error:", error);
      Swal.fire({
        title: "Export Failed",
        text: error.message || "Failed to export data.",
        icon: "error",
      });
    } finally {
      setExporting(false);
    }
  };

  // =======================================================
  // DELETE MESSAGE
  // =======================================================

  const deleteMessage = async (id, email) => {
    const result = await Swal.fire({
      title: "Delete message?",
      html: `Delete message from <strong class="text-red-500">${email}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);

    try {
      await api(`/api/contact/${id}`, { method: "DELETE" });

      setMessages((prev) => prev.filter((message) => message._id !== id));

      await Swal.fire({
        title: "Deleted!",
        text: "Message deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete message error:", error);
      await Swal.fire({
        title: "Error",
        text: error.message || "Failed to delete message.",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // =======================================================
  // DELETE WAITLIST
  // =======================================================

  const deleteWaitlistEntry = async (id, email) => {
    const result = await Swal.fire({
      title: "Delete waitlist entry?",
      html: `Remove <strong class="text-red-500">${email}</strong> from waitlist?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);

    try {
      await api(`/api/waitlist/${id}`, { method: "DELETE" });

      setWaitlist((prev) => prev.filter((entry) => entry._id !== id));

      await Swal.fire({
        title: "Deleted!",
        text: "Waitlist entry deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete waitlist error:", error);
      await Swal.fire({
        title: "Error",
        text: error.message || "Failed to delete waitlist entry.",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // =======================================================
  // VIEW MESSAGE
  // =======================================================

  const handleViewMessage = (message) => {
    setSelectedMessage(message);

    if (message.status === "pending") {
      api(`/api/contact/${message._id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: "read" }),
      })
        .then(() => console.log("✅ Message marked as read"))
        .catch((error) => console.error("❌ Mark read error:", error));

      setMessages((prev) =>
        prev.map((m) =>
          m._id === message._id ? { ...m, status: "read" } : m
        )
      );
    }
  };

  // =======================================================
  // STATUS UPDATE
  // =======================================================

  const handleStatusUpdate = (id, newStatus) => {
    setMessages((prev) =>
      prev.map((message) =>
        message._id === id ? { ...message, status: newStatus } : message
      )
    );

    setSelectedMessage((prev) =>
      prev ? { ...prev, status: newStatus } : prev
    );
  };

  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = () => {
    setCurrentPage(1);
    setSearchTerm("");

    if (activeTab === "messages") {
      fetchMessages(true);
    } else {
      fetchWaitlist(true);
    }
  };

  // =======================================================
  // LOGOUT
  // =======================================================

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await signOut(auth);
      console.log("✅ Firebase logout successful");

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      await Swal.fire({
        title: "Logged Out",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      window.location.replace("/admin/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
      Swal.fire({
        title: "Logout Failed",
        text: error.message || "Unable to logout.",
        icon: "error",
      });
    }
  };

  // =======================================================
  // LOADING SCREEN
  // =======================================================

  if (loading && !messages.length && !waitlist.length) {
    return (
      <>
        <Header user={user} onLogout={handleLogout} />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pt-20">
          <div className="container mx-auto px-4 py-8">
            <LoadingSkeleton />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // =======================================================
  // MAIN UI
  // =======================================================

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* HERO */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-200">
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                </div>
                <p className="text-gray-600 ml-12 font-medium">
                  Manage contact messages and waitlist subscribers
                </p>
                {user?.email && (
                  <p className="text-xs text-gray-500 ml-12 mt-2">
                    Signed in as{" "}
                    <span className="text-indigo-600 font-semibold">
                      {user.email}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportCSV}
                  disabled={exporting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50 shadow-md shadow-emerald-200 font-medium"
                >
                  {exporting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{exporting ? "Exporting..." : "Export CSV"}</span>
                </button>

                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-sm font-medium"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-red-700 font-semibold">API Error</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="p-2 hover:bg-red-100 rounded-lg"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <ModernStatCard
              title="Total Messages"
              value={stats.totalMessages}
              icon={MessageSquare}
              color="indigo"
              trend="+12% this month"
              subtitle="All time"
            />
            <ModernStatCard
              title="Pending Replies"
              value={stats.pendingMessages}
              icon={Clock}
              color="amber"
              subtitle="Awaiting response"
            />
            <ModernStatCard
              title="Replied"
              value={stats.repliedMessages}
              icon={CheckCircle}
              color="emerald"
              subtitle="Completed"
            />
            <ModernStatCard
              title="Waitlist Signups"
              value={stats.totalWaitlist}
              icon={UserPlus}
              color="purple"
              trend={`${stats.totalWaitlist} subscribers`}
              subtitle="Early access"
            />
          </div>

          {/* TABS & SEARCH */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex gap-2">
                <ModernTabButton
                  active={activeTab === "messages"}
                  onClick={() => {
                    setActiveTab("messages");
                    setCurrentPage(1);
                    setSearchTerm("");
                  }}
                  icon={MessageSquare}
                  label="Messages"
                  count={messages.length}
                />
                <ModernTabButton
                  active={activeTab === "waitlist"}
                  onClick={() => {
                    setActiveTab("waitlist");
                    setCurrentPage(1);
                    setSearchTerm("");
                  }}
                  icon={UserPlus}
                  label="Waitlist"
                  count={waitlist.length}
                />
              </div>

              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-800 placeholder-gray-400"
                  placeholder={
                    activeTab === "messages"
                      ? "Search by name, email or message..."
                      : "Search by email..."
                  }
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* EXPORT INFO BAR */}
          {(activeTab === "messages"
            ? filteredMessages.length > 0
            : filteredWaitlist.length > 0) && (
            <div className="mb-4 flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <FileSpreadsheet className="w-4 h-4" />
                <span className="font-medium">
                  {activeTab === "messages"
                    ? filteredMessages.length
                    : filteredWaitlist.length}{" "}
                  record
                  {(activeTab === "messages"
                    ? filteredMessages.length
                    : filteredWaitlist.length) !== 1
                    ? "s"
                    : ""}{" "}
                  {searchTerm ? "found" : "ready to export"}
                  {searchTerm && " (filtered)"}
                </span>
              </div>
              <button
                onClick={handleExportCSV}
                disabled={exporting}
                className="text-xs px-3 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 rounded-lg transition-all font-medium flex items-center gap-1.5 disabled:opacity-50"
              >
                <Download className="w-3 h-3" />
                Download {searchTerm ? "Filtered" : "All"} CSV
              </button>
            </div>
          )}

          {/* CONTENT */}
          <div className="space-y-4">
            {activeTab === "messages" ? (
              paginatedMessages.length === 0 ? (
                <EmptyState
                  type="messages"
                  hasSearch={!!searchTerm}
                  onClearSearch={() => setSearchTerm("")}
                />
              ) : (
                paginatedMessages.map((message) => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    onDelete={deleteMessage}
                    onViewMessage={handleViewMessage}
                    isDeleting={deletingId === message._id}
                  />
                ))
              )
            ) : paginatedWaitlist.length === 0 ? (
              <EmptyState
                type="waitlist"
                hasSearch={!!searchTerm}
                onClearSearch={() => setSearchTerm("")}
              />
            ) : (
              paginatedWaitlist.map((entry) => (
                <WaitlistCard
                  key={entry._id}
                  entry={entry}
                  onView={setSelectedWaitlistEntry}
                  onDelete={deleteWaitlistEntry}
                  isDeleting={deletingId === entry._id}
                />
              ))
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing page{" "}
                <span className="text-gray-900 font-semibold">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="text-gray-900 font-semibold">
                  {totalPages}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 transition-all duration-200 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200"
                            : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 transition-all duration-200 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {selectedWaitlistEntry && (
        <WaitlistModal
          entry={selectedWaitlistEntry}
          onClose={() => setSelectedWaitlistEntry(null)}
        />
      )}
    </>
  );
}