import { Card,CardHeader,CardTitle,CardContent } from "./card"
import { Avatar,AvatarImage,AvatarFallback} from "./avatar"


interface Proifleprops {
  user: {
    name: string;
    googleId?: string;
    email: string;
    avatar?: string;
  } | null;
}

export default function Profile({user}: Proifleprops) {

  if (!user) {
    return (
      <div className="flex flex-col">
        <Card className="flex justify-center flex-col w-full mx-auto mt-10" style={{ margin: 'auto' }}>
          <CardHeader className="flex items-center">
            <CardTitle className="text-lg">No Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <h1>User not found.</h1>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Card className="flex justify-center flex-col w-full mx-auto mt-10" style={{ margin: 'auto' }}>
        <CardHeader className="flex items-center">
          <CardTitle className="text-lg">{user.name}<span>&#39;</span> Profile</CardTitle>
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>Df</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <h1>Name: {user.name} </h1>
          <h1>Email: {user.email} </h1>
        </CardContent>
      </Card>
    </div>
  );
}
