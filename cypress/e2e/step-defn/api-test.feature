Feature: Testing GET Request to Zippopotam API

  Scenario: Verify GET Request to a Postal Code
    Given I have a valid API endpoint for the postal code "90210"
    When I make a GET request to the API endpoint
    Then the response status code should be 200
    And the response should have the following properties:
        | property            | value          |
        | latitude            | 34.0901        |
        | longitude           | -118.4065      |
        | state               | California     |
        | place name          |  Beverly Hills |
        | state abbreviation  | CA             |


  And the response should match the expected places:
  """
  {
    "latitude": "34.0901",
    "longitude": "-118.4065",
    "state": "California",
    "place name": "Beverly Hills",
    "state abbreviation": "CA"
  }
  """


  Scenario: Retrieve information for a city in a state
    Given I make a GET request to "/us/ma/belmont" with failOnStatusCode set to "true"
    When I receive a response
    Then the response status code should be 200
    And the response should contain the following details:
      | Field Name     | Expected Value |
      | place name     | Belmont        |


Scenario: Retrieve information for an invalid city in a state
    Given I make a GET request to "/invalid/ma/belmont" with failOnStatusCode set to "false"
    When I receive a response
    Then the response status code should be 404


  Scenario: Retrieve information for a city in a state and compare with MongoDB data
    Given I generate JSON data and seed the MongoDB database
    When I make a GET request to "/us/ma/belmont" with failOnStatusCode set to "true"
    Then the response status code should be 200
    And the response should match the MongoDB data for the city
