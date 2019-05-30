import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/screens/home";
import Review from "./src/screens/review";

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Yelp Graphql",
        }
    },
    Review: {
        screen: Review
    },
}, {
        initialRouteName: 'Home',
    });

export default createAppContainer(AppNavigator);