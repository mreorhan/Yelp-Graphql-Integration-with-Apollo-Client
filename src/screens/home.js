import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, Button } from 'react-native';
import { EXAMPLE } from '../graphql/queries';
import { Query } from "react-apollo";
import { Margin } from '../styles/theme';
import { Loader } from '../components/loader';
import { Error } from '../components/error';


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
        const { navigate } = this.props.navigation;
        return (
            <Query query={EXAMPLE} variables={{ term, location }}>
                {({ loading, error, data: { search } }) => {
                    if (loading)
                        return <Loader />

                    if (search && search.total!=0) {
                        const result = search.business.map((i, index) => {
                            return (
                                <View key={index}>
                                    <Text>{index + 1 + ". " + i.name}</Text>
                                    <Text>Rating: {i.rating} - Review: {i.review_count}</Text>
                                    <Text>{i.location.address1}</Text>
                                    <Button onPress={() => navigate('Review', { business: i.id, name: i.name })} title="See Reviews" />
                                </View>)
                        })
                        return result;
                    }
                    if (search && search.total==0)
                        return <Text>No result</Text>

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
        const { term } = this.state;
        return (
            <ScrollView>
                <View style={Margin.marginM}>
                    <TextInput onChangeText={(term) => this.setState({ term })} value={term}></TextInput>
                    <Text>Result for: {this.state.term}</Text>
                    {this.getYelp("pizza", "new york")}
                </View>
            </ScrollView>
        )
    }
}