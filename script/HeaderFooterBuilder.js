function HeaderBuilderUnauthorized(){
    let head = `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-bg">
        <div class="container-fluid">
            <a class="navbar-brand" href="pages/home.html">
                <img src="assets/images/common/logo.png" alt="" class="d-inline-block align-text-top img-logo">
                <p class="text-logo">
                    AwesomeStay
                </p>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="col-auto">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <button type="button" class="btn btn-secondary" id="btn-login"> Login </button>
                        <button type="button" class="btn btn-secondary" id="btn-register"> Register </button>
                    </ul>
                </div>
            </div>
        </div>
    </nav>`
    return head;
}

function HeaderBuilderForPages(){
    let head = `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-bg">
        <div class="container-fluid">
            <a class="navbar-brand" href="../index.html">
                <img src="../assets/images/common/logo.png" alt="" class="d-inline-block align-text-top img-logo">
                <p class="text-logo">
                    AwesomeStay
                </p>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="col-auto">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <button type="button" class="btn btn-secondary" id="btn-login"> Login </button>
                        <button type="button" class="btn btn-secondary" id="btn-register"> Register </button>
                    </ul>
                </div>
            </div>
        </div>
    </nav>`
    return head;
}

function FooterBuilder(){
    let foot = `
    <!-- Footer -->
    <footer class="text-white text-center">
        <div class="sosmed">
            <div class="col-sm-12 sosmed-text"> Contact Us </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-5 mb-5">
                    <ul class="list-unstyled list-inline social text-center"></ul>
                        <li class="list-inline-item">
                            <a href="https://www.twitter.com">
                                <i class="fab fa-twitter fa-2x">
                                    <div class="fa-text">
                                        Instagram
                                    </div>
                                </i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.linkedin.com">
                                <i class="fa fa-linkedin fa-2x">
                                    <div class="fa-text">
                                        Linkedin
                                    </div>
                                </i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.instagram.com">
                                <i class="fa fa-instagram fa-2x">
                                    <div class="fa-text">
                                        Instagram
                                    </div>
                                </i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.youtube.com">
                                <i class="fa fa-youtube fa-2x">
                                    <div class="fa-text">
                                        Youtube
                                    </div>
                                </i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.facebook.com">
                                <i class="fa fa-facebook fa-2x">
                                    <div class="fa-text">
                                        Facebook
                                    </div>
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
                <hr>
            </div>

            <!--copyright text-->
            <p class="text-center copyright">Copyright @2021 AwesomeStay. All Rights Reserved </p>
        </div>
    </footer>`
    return foot;
}

// Check pathname
function pathname(){
    return window.location.pathname
}
var pathname = pathname()

// If di dalam pages
if(pathname.includes("pages")){
    doc = doc = document.getElementById("content-body-master-body")
    doc.innerHTML = HeaderBuilderForPages() + doc.innerHTML + FooterBuilder();
}
// If di index
else{
    // if belum login..
    doc = document.getElementById("content-body-master-body")
    doc.innerHTML = HeaderBuilderUnauthorized() + doc.innerHTML + FooterBuilder();
    // else udah login..
}




