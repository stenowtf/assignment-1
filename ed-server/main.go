package main

import (
	"log"
	"net/http"

	r "gopkg.in/gorethink/gorethink.v3"
)

type Marker struct {
	Latitude  float64 `json:"latitude" gorethink:"latitude"`
	Longitude float64 `json:"longitude" gorethink:"longitude"`
	Country   string  `json:"country" gorethink:"country"`
	Time      string  `json:"time" gorethink:"time"`
	Key       string  `json:"key" gorethink:"key"`
}

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "db:28015",
		Database: "edserver",
	})

	if err != nil {
		log.Panic(err.Error())
	}

	router := NewRouter(session)

	router.Handle("map subscribe", subscribeMap)
	router.Handle("map unsubscribe", unsubscribeMap)
	router.Handle("marker add", addMarker)
	router.Handle("marker remove", removeMarker)
	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
