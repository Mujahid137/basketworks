import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { supabase } from "../src/lib/supabaseClient";

type ProfileForm = {
  full_name: string;
  role: string;
  company: string;
  website: string;
  phone: string;
};

const emptyProfile: ProfileForm = {
  full_name: "",
  role: "",
  company: "",
  website: "",
  phone: "",
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileForm>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        if (!user) {
          setNotice("Please log in to view your profile.");
          return;
        }
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, role, company, website, phone")
          .eq("id", user.id)
          .single();
        if (error) throw error;
        if (active && data) {
          setProfile({
            full_name: data.full_name ?? "",
            role: data.role ?? "",
            company: data.company ?? "",
            website: data.website ?? "",
            phone: data.phone ?? "",
          });
        }
      } catch (err: any) {
        if (active) {
          setNotice(err?.message || "Unable to load profile.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setNotice(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) {
        setNotice("Please log in to save changes.");
        return;
      }
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name || null,
          role: profile.role || null,
          company: profile.company || null,
          website: profile.website || null,
          phone: profile.phone || null,
        })
        .eq("id", user.id);
      if (error) throw error;
      setNotice("Profile updated.");
    } catch (err: any) {
      setNotice(err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
            Profile
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold font-display">
            Profile info
          </h1>
          <p className="mt-3 theme-muted">
            Update your personal and company details for your client workspace.
          </p>

          <div className="mt-8 rounded-3xl p-6 md:p-8 theme-card">
            {notice && <p className="mb-6 text-sm theme-muted">{notice}</p>}
            <div className="grid gap-5">
              <div>
                <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Full name
                </label>
                <input
                  value={profile.full_name}
                  onChange={(event) => handleChange("full_name", event.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Role / Title
                </label>
                <input
                  value={profile.role}
                  onChange={(event) => handleChange("role", event.target.value)}
                  placeholder="Founder, CMO, etc."
                  className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Company
                </label>
                <input
                  value={profile.company}
                  onChange={(event) => handleChange("company", event.target.value)}
                  placeholder="Company name"
                  className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                  disabled={loading}
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                    Website
                  </label>
                  <input
                    value={profile.website}
                    onChange={(event) => handleChange("website", event.target.value)}
                    placeholder="https://"
                    className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                    Phone
                  </label>
                  <input
                    value={profile.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    placeholder="+1 000 000 0000"
                    className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm theme-muted">
                  Only you can access and update this information.
                </p>
                <button
                  onClick={handleSave}
                  className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  disabled={saving || loading}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
