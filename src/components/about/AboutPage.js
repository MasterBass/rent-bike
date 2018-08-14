import React from 'react';

const AboutPage = () => {
    return (
        <div>
            <h4>Write an application to manage bike rentals</h4>

            <ul>
                <li> The application must be React-based</li>
                <li>Users must be able to create an account and log in</li>
                <li>Include at least 2 user roles: Manager and User</li>
                <li>Each bike will have the following information in the profile: Model, Photo,
                    Color, Weight, Location and a checkbox indicating if the bike is available
                    for rental or not
                </li>
            </ul>


            <h4>Managers can:</h4>

            <ul>
                <li>Create, Read, Edit, and Delete Bikes (including Photo upload)</li>
                <li>Create, Read, Edit, and Delete Users and Managers</li>
                <li>See all the users who reserved a bike, and the period of time they did it
                </li>
                <li>See all the bikes reserved by a user, and the period of time they did it
                </li>
            </ul>


            <h4>Users can:</h4>

            <ul>
                <li>See a list of all available bikes for some specific dates</li>
                <li>Filter by color, model, weight, location or rate averages</li>
                <li>Display the bikes in a map, according to the location</li>
                <li>Reserve a bike for a specific period of time</li>
                <li>Rate the bikes with a score 1 to 5</li>
                <li>Cancel a reservation</li>
            </ul>

            <p>
                You may use Firebase or similar services for the back-end.
            </p>
            <br/><br/>
            <h4>Q&A</h4>


            <p>Location is a GPS coordinate? Or should we set some pickup centers from which the
                client can pickup the bikes (and this centers with GPS coordinates?

            </p>
            <p>
                Location can be internally stored as a GPS coordinate. When selecting a location
                from the UI, you can use a maps API to get those coordinates from a friendly
                location string. It's not necessary to define pickup centers in this project.
            </p>
            <hr/>
            <p>Regarding the map, do I need to display a certain number of bikes and then lazy
                load as the user navigates through the map, or should I view the map only on
                prompt when the user asks to display a certain bike (displaying only one bike)?
            </p>
            <p>
                You'll have to display all the bikes in a map and lazy load as the user
                navigates through
            </p>


        </div>
    );
};

export default AboutPage;