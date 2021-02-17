
const ProfileInfo = ({user}) =>{
    const onLogOutClickButton = () => {
        
    }
    console.log(user)
    return(
        <section class="profileinfo" id="profileinfo">
        <div class="container">
          <div class="row">

            <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
              <h2 class="mb-3 text-white" data-aos="fade-up">{user.username}</h2>

              <p data-aos="fade-up" data-aos-delay="200"> {user.email}.</p>

              <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onLogOutClickButton}>Log Out</a>
            </div>

            <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
              <div class="about-working-hours">
                <div>

                  <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">Music World</h2>

                  <p data-aos="fade-up" data-aos-delay="800">free lyrics</p>

                  <p data-aos="fade-up" data-aos-delay="800">findig meaning easily</p>

                  <p data-aos="fade-up" data-aos-delay="800">talk about songs</p>

                  <p data-aos="fade-up" data-aos-delay="800">find your favoraye songs</p>

                  <p data-aos="fade-up" data-aos-delay="800">find new friends</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
        
    )
}




export {ProfileInfo}