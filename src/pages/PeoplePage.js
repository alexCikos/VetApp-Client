import fred from '../images/fred.jfif';
import jane from '../images/jane.jfif';
import bob from '../images/bob.jfif';

export default function People() {
    return (

      <div className="people">
                <h2>About Us</h2>
      <div class="people_wrapper">


        <div className="card">
        <p><strong>Meet Fred</strong></p>
        <div class="people_image"><img src={fred} alt="Image of Fred" />
        </div>
                    <div class="people_description">

                        <p>Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea 
                            commodo consequat. 
                            Duis aute irure dolor in 
                            reprehenderit in voluptate 
                            velit esse cillum dolore eu 
                            fugiat nulla pariatur. Excepteur 
                            sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.</p>
                    </div>
                    </div>

            
            <div className="card">
            <p><strong>Meet Jane</strong></p>
                <div class="people_image"><img src={jane} alt="Image of Jane" /></div>
                    <div class="people_description">

                    <p>Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea 
                            commodo consequat. 
                            Duis aute irure dolor in 
                            reprehenderit in voluptate 
                            velit esse cillum dolore eu 
                            fugiat nulla pariatur. Excepteur 
                            sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.</p>
                    </div>
            </div>
            
            <div className="card">
            <p><strong>Meet Bob</strong></p>
                <div class="people_image"><img src={bob} alt="Image of Bob" /></div>
                    <div class="people_description">

                    <p>Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea 
                            commodo consequat. 
                            Duis aute irure dolor in 
                            reprehenderit in voluptate 
                            velit esse cillum dolore eu 
                            fugiat nulla pariatur. Excepteur 
                            sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.</p>
                    </div>

        </div>
      </div>
      </div>



    )
  }