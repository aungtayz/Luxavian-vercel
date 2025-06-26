import {Button} from "@/components/ui/button";

const LogoutButton = () => {
  const handleLogout = () => {
    // Perform logout logic here
    const fetcher = async () => {   
        const res = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'GET',
            credentials: 'include',
        });
        if (!res.ok) {
            throw new Error('Logout failed');
        }
        }
    console.log("User logged out");
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;