import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GET_REVIEWS } from '../graphql/queries';
import { Query } from "react-apollo";
import { FontSize, Margin } from '../styles/theme';
import { Loader } from '../components/loader';
import { Error } from '../components/error';


export default class Review extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`
    });

    getReviews = (business) => {
        return (
            <Query query={GET_REVIEWS} variables={{ business }}>
                {({ loading, data: { reviews }, error }) => {

                    if (loading) {
                        return <Loader />
                    }
                    if (reviews) {
                        const result = reviews.review.map((i, index) => {
                            return (
                                <View key={index} style={Margin.marginBottomS}>
                                    <Text>{index + 1 + ". " + i.text}</Text>
                                </View>
                            )
                        })
                        return result;
                    }
                    if (error)
                        return <Error errorCode={error.message} />

                    return (
                        <Text>No result</Text>
                    );
                }}
            </Query>
        )
    }

    render() {
        const { navigation } = this.props;
        const business = navigation.getParam('business', 'no-business');
        const name = navigation.getParam('name', 'no-name');

        return (
            <ScrollView>
                <View style={Margin.marginM}>
                    <Text style={FontSize.fontL}>Reviews</Text>
                    {this.getReviews(business)}
                </View>
            </ScrollView>
        )
    }
}