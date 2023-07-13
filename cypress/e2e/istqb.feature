Feature: Animal Friends Insurance Test Automation challenge

    Scenario: Display cost of ISTQB exam
        Given User is at the home page
        When User searches for 'foundation'
        And User clicks learn more about 'ISTQB® Certified Tester - Foundation Level 4.0 (CTFL)'
        And User selects 'Language' 'Spanish'
        And User selects 'Exam method' 'Test Center'
        And User checks option 'printed certificate'
        And User clicks on button 'Add to cart'
        Then User sees the cost of the course
