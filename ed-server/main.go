package main

import (
	"log"
	"net/http"

	r "gopkg.in/gorethink/gorethink.v3"
)

type Download struct {
	Latitude  float64 `json:"latitude" gorethink:"latitude"`
	Longitude float64 `json:"longitude" gorethink:"longitude"`
	Country   string  `json:"country" gorethink:"country"`
	Time      string  `json:"time" gorethink:"time"`
	Key       string  `json:"key" gorethink:"key"`
	OS        string  `json:"os" gorethink:"os"`
	Version   string  `json:"version" gorethink:"version"`
}

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "dd",
	})

	if err != nil {
		log.Panic(err.Error())
	}

	router := NewRouter(session)

	router.Handle("map subscribe", subscribeMap)
	router.Handle("map unsubscribe", unsubscribeMap)
	router.Handle("download add", addDownload)
	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
