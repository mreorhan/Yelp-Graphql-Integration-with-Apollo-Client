import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { GET_REVIEWS } from '../graphql/queries';
import { Query } from "react-apollo";
import { fontSize, margin } from '../styles/theme';


export default class Review extends Component {

    getReviews = (business) => {
        return (
            <Query query={GET_REVIEWS} variables={{ business }}>
                {({ loading, data: { reviews }, error }) => {

                    if (loading) {
                        return <Text>Loading...</Text>
                    }
                    if (reviews) {
                        const result = reviews.review.map((i, index) => {
                            return (
                                <View key={index} style={margin.marginBottomS}>
                                    <Text>{index + 1 + ". " + i.text}</Text>
                                </View>)
                        })
                        return result;
                    }
                    if (error)
                        return <Text>{error.message}</Text>

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
        const name = navigation.getParam('name', 'no-business');
        console.log(business)
        return (
            <ScrollView>
                <View style={margin.marginM}>
                <Text style={fontSize.fontL}>{name}</Text>
                {this.getReviews(business)}
                </View>
            </ScrollView>
        )
    }
}