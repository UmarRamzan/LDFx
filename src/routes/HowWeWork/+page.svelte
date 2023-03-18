<script></script>

<main>
    <div class="howWeWork">
        
        <div class="text">
            <h1 class="title">How We Work</h1>
            <br>
            <br>
            <ul>
                <li>
                    <p>Easily swap courses with other students and get notified when we find a match!</p>
                </li>
                <br>
                <li>
                    <p>Search and apply for part-time, full-time, and internship opportunities on our job board!</p>
                </li>
                <br>
                <li>
                    <p>Create a donation request for educational expenses and get help from our community!</p>
                </li>
                <br>
            </ul>
            <br>
            <br>
            <br>
            <h4><em>Join our community today and start exploring!</em></h4>
        </div>

        <div class="image">
            <img src="src\routes\HowWeWork\HowWeWork.png" alt="How We Work" class="responsive">
        </div>
        
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300&family=Chau+Philomene+One&display=swap');
    
    p {
        text-align: left;
        padding-left: 1rem;
        font-size: x-large;
        font-family: 'Chakra Petch', sans-serif;
        color: #1b2e35;
    }

    h4 {
        text-align: center;
        padding-left: 2rem;
        font-family: 'Chakra Petch', sans-serif;
        font-size: large;
        font-weight: 900;
        color: #3464aa;
    }

    li {
        display: list-item;
        margin-left: 7rem;
        list-style-type: '❯❯';
        font-size: x-large;
        line-height: 4rem;
    }

    .responsive {
        max-width: 100%;
        max-height: 100%;
        float: right;
    }

    .image {
        padding-right: 4rem;
    }
    
    .howWeWork {
        background-color: #ffefe5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 100%;
        margin: auto;
    }

    .title {
        font-size: 50px;
        font-family: 'Chau Philomene One', sans-serif;
        text-align: left;
        padding-inline-start: 4.5ch;
        color: #3464aa;
        display: inline-block;
        position: relative;
    }

    .title::after {
        content: '';
        height: 4px;
        width: 51%;
        background: #fa5f30;
        position: absolute;
        left: calc(70% - 19%);
        bottom: 6.5px;
    }

    .text {
        flex-basis: 50%;
        margin-top: 5rem;
        margin-bottom: 5rem;
    }

    li::marker {
        color: hotpink;
    }

</style>