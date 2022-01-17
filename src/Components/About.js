import { Link } from "react-router-dom"

const About = () => {
    return (
        <div>
            <h3 class="center-text highlight"> Description</h3>
            <p class="highlight">This is a task app in which you can add or remove tasks. In addition to this you can set reminder 
                for tasks by either clicking the 'Set Reminder' checkbox or double clicking th task. The reminder 
                tasks wll be highlighted.</p>
            <Link to="/">Go back </Link>
        </div>
    )
}

export default About
