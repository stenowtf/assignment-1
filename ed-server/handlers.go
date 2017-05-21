package main

import (
	"fmt"

	"github.com/mitchellh/mapstructure"
	r "gopkg.in/gorethink/gorethink.v3"
)

func addMarker(client *Client, data interface{}) {
	var marker Marker
	err := mapstructure.Decode(data, &marker)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		err = r.Table("marker").
			Insert(marker).
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}

		fmt.Printf("%+v\n", marker)
	}()
}

func removeMarker(client *Client, data interface{}) {

}

const (
	MapStop = iota
)

func subscribeMap(client *Client, data interface{}) {
	stop := client.NewStopChannel(MapStop)
	result := make(chan r.ChangeResponse)
	cursor, err := r.Table("marker").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()
	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"marker add", change.NewValue}
				}
			}
		}
	}()
}

func unsubscribeMap(client *Client, data interface{}) {
	client.StopForKey(MapStop)
}
