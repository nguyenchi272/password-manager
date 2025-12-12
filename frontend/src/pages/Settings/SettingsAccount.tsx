import { useEffect, useState } from "react";
import { useAuthStore } from "../../state/auth.store";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  getProfileAPI,
  updateNameAPI,
  updateEmailAPI,
  updatePasswordAPI,
  deleteAccountAPI
} from "../../api/profile.api";

export default function SettingsAccount() {
  const { user, loadUser, logout } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const saveProfile = async () => {
    await updateNameAPI(name);
    await loadUser();
    alert("Profile updated");
  };

  const saveEmail = async () => {
    await updateEmailAPI(email);
    await loadUser();
    alert("Email updated");
  };

  const changePassword = async () => {
    const res = await updatePasswordAPI({ currentPassword, newPassword });
    alert("Password updated");
    setCurrentPassword("");
    setNewPassword("");
  };

  const deleteAccount = async () => {
    await deleteAccountAPI();
    logout();
    alert("Account deleted");
  };

  return (
    <div className="p-6 space-y-8 text-gray-800 dark:text-gray-200">

      {/* Profile */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <label className="block mb-2">Display Name</label>
        <Input
          className="mb-4 dark:bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button onClick={saveProfile} className="mt-2">Save</Button>
      </Card>

      {/* Email */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Email</h2>

        <label className="block mb-2">Email</label>
        <Input
          className="mb-4 dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={saveEmail} className="mt-2">Update Email</Button>
      </Card>

      {/* Password */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <label className="block mb-2">Current Password</label>
        <Input
          type="password"
          className="mb-4 dark:bg-gray-700"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label className="block mb-2">New Password</label>
        <Input
          type="password"
          className="mb-4 dark:bg-gray-700"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button onClick={changePassword} className="mt-2">Change Password</Button>
      </Card>

      {/* Delete account */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>

        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete Account
        </Button>
      </Card>

      {/* Confirm delete */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-red-500">
              Confirm Delete Account
            </DialogTitle>
          </DialogHeader>

          <p>Are you sure you want to delete your account? This cannot be undone.</p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={deleteAccount}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
