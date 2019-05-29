import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, Button, Alert } from 'react-native'
import { EXAMPLE } from '../graphql/queries';
import { Query } from "react-apollo";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "burrito",
            location: "san francis"
        }
    }

    getYelp = () => {
        const { term, location } = this.state;
        return (
            <Query query={EXAMPLE} variables={{ term, location }}>
                {({ loading, data: { search }, error }) => {

                    if (loading) {
                        return <Text>Loading...</Text>
                    }
                    if (search) {
                        const result = search.business.map((i, index) => {
                            return (
                                <View key={index}>
                                    <Text>{index + 1 + ". " + i.name}</Text>
                                    <Text>Rating: {i.rating} - Review: {i.review_count}</Text>
                                    <Text>{i.location.address1}</Text>
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
        const { term } = this.state;
        return (
            <ScrollView>
                <TextInput onChangeText={(term) => this.setState({ term })} value={term}></TextInput>
                <Text>Result for: {this.state.term}</Text>
                {this.getYelp("pizza", "new york")}
            </ScrollView>
        )
    }
}