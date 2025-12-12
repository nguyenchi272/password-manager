import { useEffect, useState } from "react";
import {
  getProfileAPI,
  updateProfileAPI,
  changePasswordAPI,
  deleteProfileAPI,
} from "../../api/profile.api";

import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";

export default function SettingProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPw, setLoadingPw] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [isPwOpen, setIsPwOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Reset pw fields when closing modal
  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Load profile info
  const loadProfile = async () => {
    try {
      const res = await getProfileAPI();
      const user = res?.data;

      setName(user?.name || "");
      setEmail(user?.email || "");
    } catch (err) {
      console.error("Failed to load profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Save updated profile
  const saveProfile = async () => {
    try {
      setLoadingSave(true);
      await updateProfileAPI(name, email);
      alert("Profile updated successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoadingSave(false);
    }
  };

  // Change Password
  const submitChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoadingPw(true);
      await changePasswordAPI(currentPassword, newPassword);

      alert("Password changed successfully");

      resetPasswordFields();
      setIsPwOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoadingPw(false);
    }
  };

  // Delete account
  const submitDelete = async () => {
    try {
      setLoadingDelete(true);
      await deleteProfileAPI();

      alert("Account deleted");

      localStorage.clear();
      window.location.href = "/login";
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">

      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Account Settings</h1>

        <Button onClick={saveProfile} disabled={loadingSave}>
          {loadingSave ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Profile Form */}
      <div className="space-y-6 p-6 border border-border rounded-lg bg-card shadow-sm">

        <div className="space-y-2">
          <Label>Display Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your display name"
          />
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
          />
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Button variant="outline" onClick={() => setIsPwOpen(true)}>
            Change Password
          </Button>

          <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
            Delete Account
          </Button>
        </div>
      </div>

      {/* Dialog Change Password */}
      <Dialog open={isPwOpen} onOpenChange={(open) => {
        setIsPwOpen(open);
        if (!open) resetPasswordFields();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">

            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPwOpen(false)}>
              Cancel
            </Button>

            <Button onClick={submitChangePassword} disabled={loadingPw}>
              {loadingPw ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Delete Account */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>

          <p>Are you sure you want to delete your account? This cannot be undone.</p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={submitDelete}
              disabled={loadingDelete}
            >
              {loadingDelete ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
