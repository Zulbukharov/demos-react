package main

import (
	"fmt"

	gql "github.com/btubbs/garphunql"
)

type User struct {
	ID   string `json: "id"`
	Name string `json: "name"`
}

// insert_users": {
// 	"affected_rows": 1
//   }
type Insert struct {
	insertUsers string `json: "insert_users"`
	// affectedRows int    `json: "affected_rows"`
}

func (u User) Format() (string, error) {
	v := fmt.Sprintf(`{id: "%s", name: "%s"}`, u.ID, u.Name)
	return v, nil
}

func simpleQuery(client *gql.Client) {
	var me []User

	/*
		{
			users {
				id
				name
			}
		}
	*/
	myField := gql.Field("users", gql.Field("id"), gql.Field("name"))
	err := client.Query(
		myField(gql.Dest(&me)),
	)
	fmt.Println(err, me)
	// mutation {
	// 	insert_users(objects: {id: "s", name: "s"}) {
	// 	  affected_rows
	// 	}
	// }
	// Name      string
	// Arguments map[string]interface{}
	// Fields    []GraphQLField
	// Alias     Alias
	// Dest      interface{}

	// objects
	// id sd id sdsd
	// e := gql.GraphQLField{Name: "id", Alias: "ss"}

	// r := map[string]interface{}{"id": "2", "name": "3"}
	// s := gql.GraphQLField{
	// Arguments: map[string]interface{}{"id": "2", "name": "3"},
	// }
	// // s := `{id: 2, name: 33}`
	// s := gql.ArgumentFormatter{"ss"}
	// var res Insert
	var w gql.ArgumentFormatter = User{"22", "abl"}
	d := map[string]interface{}{"objects": w}
	mutationQuery := gql.GraphQLField{
		Name:      "insert_users",
		Arguments: d,
		Fields: []gql.GraphQLField{
			{Name: "affected_rows"},
		},
		// Dest: &res,
	}
	// fmt.Println("[res]", res)
	// m := gql.
	// mutationQuery := gql.Argument(
	// 	"objects",
	// )

	err = client.Mutation(mutationQuery)
	fmt.Println(err)
}

func main() {
	client := gql.NewClient(
		"https://testing-app-1997.herokuapp.com/v1alpha1/graphql",
		gql.Header("x-hasura-admin-secret", "FNd95nNh"),
	)
	simpleQuery(client)
}
