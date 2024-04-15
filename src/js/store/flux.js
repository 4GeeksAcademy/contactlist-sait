

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// demo: [
			// 	// {
			// 	// 	title: "FIRST",
			// 	// 	background: "white",
			// 	// 	initial: "white"
			// 	// },
			// 	// {
			// 	// 	title: "SECOND",
			// 	// 	background: "white",
			// 	// 	initial: "white"
			// 	// }
			// ],
            contacts: []
            

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			changeContactProperty: (originalName, property, value) => {
                const store = getStore();




                const newContacts = store.contacts.map((contact) => {
                    if (contact.name === originalName) {
                        return {
                            ...contact,
                            [property]: value
                        }
                    } else {
                        return contact
                    }
                });




                //reset the global store
                setStore({ contacts: newContacts });
            },
            addNewContact: async (newContact) => {
                const store = getStore();
                const newContacts = [...store.contacts, newContact]
               
                try {
                    await fetch('https://playground.4geeks.com/contact/agendas/timsslug/contacts', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newContact)
                    })
                } catch(e) {
                    console.log('Failed to add new contact')
                }


                setStore({ contacts: newContacts });
                localStorage.setItem("contacts",JSON.stringify(newContacts));
            },
            loadContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/timsslug/contacts', {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }
                    const data = await response.json()
                    setStore({ contacts: data })
                    // setStore({ contacts: })
                } catch(e) {
                    console.log('Failed to load contacts!', e)
                }

			},

            UpdateContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/timsslug/contacts/'+id, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }
                    const data = await response.json()
                    setStore({ contacts: data })
                    // setStore({ contacts: })
                } catch(e) {
                    console.log('Failed to load contacts!', e)
                }

			},

            deleteFavorite: (name) => {
                let store = getStore();
				let newContacts = store.contacts.filter((item)=>item.name !== name);
				setStore ({contacts: newContacts})
				localStorage.setItem("contacts",JSON.stringify(newContacts));
				
			},





		}
	};
};

export default getState;
