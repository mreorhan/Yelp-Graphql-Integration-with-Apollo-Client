import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native'
import { EXAMPLE } from '../graphql/queries';
import { Query } from "react-apollo";


export default class Home extends Component {
    render() {
        return (
            <ScrollView>
                <Query query={EXAMPLE}>
                    {({ client, loading, data: { search } }) => {
                        if (loading) {
                            return <Text>Loading...</Text>
                        }
                        if (search) {
                            const result = search.business.map((i, index) => {
                                return (
                                    <View key={index}>
                                        <Text>{index+1 + ". " + i.name}</Text>
                                        <Text>Rating: {i.rating} - Review: {i.review_count}</Text>
                                        <Text>{i.location.address1}</Text>
                                    </View>)
                            })
                            return result;
                        }
                        return (
                            <Text>No result</Text>
                        );
                    }}
                </Query>
            </ScrollView>
        )
    }
}