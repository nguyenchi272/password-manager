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

  const [isPwOpen, setIsPwOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load profile info
  const loadProfile = async () => {
    const res = await getProfileAPI();
    setName(res.data.name || "");
    setEmail(res.data.email || "");
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Save updated profile
  const saveProfile = async () => {
    try {
      await updateProfileAPI(name, email);
      alert("Profile updated successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Change Password
  const submitChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await changePasswordAPI(currentPassword, newPassword);
      alert("Password changed successfully");
      setIsPwOpen(false);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  // Delete account
  const submitDelete = async () => {
    try {
      await deleteProfileAPI();
      alert("Account deleted");

      localStorage.clear();
      window.location.href = "/login";
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">

      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <Button onClick={saveProfile}>Save Changes</Button>
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
      <Dialog open={isPwOpen} onOpenChange={setIsPwOpen}>
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
            <Button onClick={submitChangePassword}>Update</Button>
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
            <Button variant="destructive" onClick={submitDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
