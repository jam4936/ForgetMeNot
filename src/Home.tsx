import "@aws-amplify/ui-react/styles.css";
import {
    withAuthenticator,
    Button,
    Heading,
    View,
    Card,
    useAuthenticator
} from "@aws-amplify/ui-react";

function Home() {
    const { signOut } = useAuthenticator()
    return (
        <View className="App">
            <Card>
                <Heading level={1}>We now have Auth!</Heading>
            </Card>
            <Button onClick={() => signOut()}>Sign Out</Button>
        </View>
    );
}

export default withAuthenticator(Home);
