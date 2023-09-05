import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, Platform, StatusBar, ActivityIndicator, RefreshControl } from "react-native";
import axios from "axios";

const Data = () => {
    const [displayMenuItem, setDisplayMenuItem] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [render, setRender] = useState(true)

    const onRefresh = () => {
        setRefreshing(true);
        setRender(!render)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };


    useEffect(() => {
        axios.get(`https://stagingsite.livelaw.in/dev/h-api/news`, {
            headers: {
                "s-id": "CKEY0F1HNJGSZHJFQPYB5HBMJEM79K26YQDJTY0RX7MVPHGHXTKALSTVARSDAYKUGF2Y"
            }
        }).then(res => {
            res?.data?.news.map(value => {
                if (!value.description) {
                    value.description = "Added from my side"
                }
                console.log(value.description)
            })
            setDisplayMenuItem(res?.data?.news)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err?.response?.data?.message)
        })
    }, [render])

    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
            <ActivityIndicator size='large' color="orange" />
        </View>
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: "orange" }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
                <FlatList
                    data={displayMenuItem}
                    keyExtractor={(item) => item?.newsId}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: "white", borderRadius: 10, marginBottom: 10, padding: 10, gap: 7, }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 18, fontWeight: "500", width: "35%" }}>Media ID</Text>
                                <Text style={{ fontSize: 18, fontWeight: "500", width: "5%" }}>:</Text>
                                <Text style={{ fontSize: 18, fontWeight: "500" }}>{item?.newsId}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "grey", fontWeight: "500", width: "35%" }}>Description</Text>
                                <Text style={{ fontSize: 18, fontWeight: "500", width: "5%" }}>:</Text>
                                <Text style={{ color: "grey", fontWeight: "500" }}>{item?.description}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "grey", fontWeight: "500", width: "35%" }}>Date</Text>
                                <Text style={{ fontSize: 18, fontWeight: "500", width: "5%" }}>:</Text>
                                <Text style={{ color: "grey", fontWeight: "500" }}>{item?.date_news}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "grey", fontWeight: "500", width: "35%" }}>Author Name</Text>
                                <Text style={{ fontSize: 18, fontWeight: "500", width: "5%" }}>:</Text>
                                <Text style={{ color: "grey", fontWeight: "500" }}>{item?.authorName}</Text>
                            </View>
                        </View>}
                />
            </View>
        </SafeAreaView >
    )
}

export default Data;
