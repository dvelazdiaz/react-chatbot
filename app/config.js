let config = {
	"bot": "Andrea",
	"description": "Personal Insurance assistant",
  "avatar": "",
	"conversation": {
		/* Default dialog */
    "welcome": {
			"message": "Welcome to Chubb Insurance.",
      "delay": 0,
      "trigger": "message1"
		},

		/* Cascade dialogs */
		"flow": {
			"message1": {
  			"message": "This is a chatbot demo to test some features.",
        "delay": 0,
				"trigger": "question1"
      },
      "question1": {
  			"message": "Are you a Chubb employee?",
        "delay": 0,
  			"response": {
					/* text | options | image */
  				"type": "options",

					/* Only for options type response*/
					"options": ["Yes", "No"],

					/* required | email | number */
					"rules": ["required"],

					/* Just for text fields */
          //"placeholder": "Write some message...",

					/* Trigger dialog after response. Use string or array */
  				//"trigger": "greeting"
					"trigger": [{"Yes": "question2"}, {"No": "message2"}]
  			}
      },
			"message2": {
  			"message": "This chatbot test is only for Chubb employees",
        "delay": 0
      },
			"question2": {
  			"message": "Please enter your employee number (ex: 54.558.002/0001-20)",
        "delay": 0,
  			"response": {
  				"type": "text",
					"rules": ["required",/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/g],
          "placeholder": "Employee number. Ex: 54.558.002/0001-20",
					"trigger": "question3"
  			}
      },
			"question3": {
  			"message": "What's your name?",
        "delay": 0,
  			"response": {
  				"type": "text",
					"rules": ["required"],
          "placeholder": "Enter your name",
					"trigger": "question4"
  			}
      },
			"question4": {
  			"message": "Our system has detected that your profile picture is empty. Please upload a picture to keep updated your profile",
        "delay": 0,
  			"response": {
  				"type": "image",
					"trigger": "end"
  			}
      },
			"end": {
  			"message": "Thank you, your profile was updated successfully",
        "delay": 0
      }
     }
    }
}

export default config
