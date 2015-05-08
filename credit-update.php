<html lang="en" class="k-webkit k-webkit42">
   <head>
      <title>Settings | Rent My Estate</title>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width">
      <meta name="description" content="RME">
      <meta name="keywords" content="rent, realestate">
      <meta name="author" content="Rent My Estate">
      <!--  for fb purpose -->
      <meta property="og:url" content="//members-dev.rentmyestate.com.au/settings/account">
      <meta property="og:title" content="Rent My Estate">
      <meta property="og:description" content="RME">
      <link href="//fonts.googleapis.com/css?family=Roboto:100,400,300,500" rel="stylesheet" type="text/css">
      <link rel="stylesheet" href="https://members-dev.rentmyestate.com.au/assets/css/_style_bundle2.css?v=1.26.4" type="text/css">
      <!-- extra CSS -->
      <link href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
      <script src="https://members-dev.rentmyestate.com.au/assets/js/u/c.js?v=1.27.3"> </script>

   <body class="full-width">
      <div class="rme-wrap">
         <span id="loader" class="gloader">
         <img src="https://members-dev.rentmyestate.com.au/assets/images/ajax-loader.gif"> <span class="l">Loading</span>
         </span>
         <header class="navbar navbar-default">
            <div class="navbar-inner">
               <div class="container-fluid clearfix">
                  <a class="brand" href="https://members-dev.rentmyestate.com.au/dashboard/index">
                  <img src="https://members-dev.rentmyestate.com.au/assets/images/rme-logo.png">
                  </a>
                  <div class="pull-right">
                     <div class="nav-links">
                        <ul class="nav ui-top-menu">
                           <li class="dropdown">
                              <div class="box dropdown-menu" role="menu" aria-labelledby="username">
                                 <div class="popover bottom dp-arrow">
                                    <div class="arrow"></div>
                                 </div>
                                 <ul class="ui-dp-content text-center">
                                    <li> <a href="https://members-dev.rentmyestate.com.au/admin/useraccounts/to_admin">Back to Admin</a> </li>
                                    <li><a href="https://members-dev.rentmyestate.com.au/users/details">Profile</a></li>
                                    <li><a href="https://members-dev.rentmyestate.com.au/settings/account">Settings</a></li>
                                    <li class="bg-white">
                                       <a href="https://members-dev.rentmyestate.com.au/dashboard/set_default/owner" class="owner-account ck-green selected">Owner Account</a>
                                       <hr>
                                    </li>
                                    <li class="bg-white btop-none"><a href="https://members-dev.rentmyestate.com.au/dashboard/set_default/tenant" class="tenant-account ck-green  ">Tenant Account</a></li>
                                    <li><a href="https://members-dev.rentmyestate.com.au/logout">Logout</a></li>
                                    <li class="cui-tooltip">
                                       <a data-original-title="Advertise your properties for sale using Sell My Estate" data-placement="left" data-toggle="tooltip" class="app-switch sme" href="https://members-dev.rentmyestate.com.au/membership/swap/index">Switch To<span class="sites-switch-logo"></span></a>
                                    </li>
                                 </ul>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <section class="subnavbar">
            <ul class="ui-bread clearfix gd">
               <li class="dropdown ui-crumbs start">
                  <a href="#" data-toggle="dropdown" role="button" class="dropdown-toggle ui-c-item hv-fa" id="propertyList">
                  <span class="fa fa-chevron-down"></span> My Properties
                  </a>
                  <div class="dropdown-menu property-listings" role="menu" aria-labelledby="propertyList">
                     <div class="popover bottom dp-arrow l">
                        <div class="arrow"></div>
                     </div>
                     <div class="row text-center ui-footer">
                        <div class="col-md-6">
                           <a href="https://members-dev.rentmyestate.com.au/dashboard/owner" class="my-properties">
                           <span class="fa fa-th-large"></span>
                           My Properties
                           </a>
                        </div>
                        <div class="col-md-6">
                           <a href="#" id="bc_add_property" class="add-property">
                           <span class="fa fa-plus"></span>
                           Add Property
                           </a>
                        </div>
                     </div>
                  </div>
               </li>
               <li class="ui-crumbs end">
                  <span class="ui-c-item">Settings</span>
               </li>
            </ul>
         </section>
         <script src="https://maps.googleapis.com/maps/api/js?v=3.5&amp;sensor=false&amp;libraries=places" type="text/javascript"></script><script src="https://maps.gstatic.com/maps-api-v3/api/js/18/22/main.js"></script><script src="https://maps.gstatic.com/maps-api-v3/api/js/18/22/places.js"></script>
         <section class="container-fluid mid-section bg-white">
            <div class="row">
               <div class="left-col">
                  <ul class="nav nav-tabs vertical floating sticky top0">
                     <li>
                        <a href="#">General Settings</a>
                     </li>
                     <li class="active"><a href="#userSetting" data-toggle="tab">Credit Card</a></li>
                     <li><a href="#ownerSetting" data-toggle="tab">Notification Settings</a></li>
                     <li><a href="#" data-show-pd="list">Property Settings <i class="fa fa-chevron-right pull-right"></i></a></li>
                     <li><a href="#credits" data-toggle="tab">My Credits</a></li>
                  </ul>
               </div>
               <div class="right-col mar-e pull-left">
                  <div class="mar-e-inner clearfix">
                     <div class="listing-slide with-slide-content" data-pd-list="slide">
                        <div class="listing-slide-inner property-listings">
                           <!-- <div class="listing-head">My Properties</div> -->
                           <ul class="main-listing listing-items max-height-none">
                              <li>
                                 <a href="2831" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/house-avatar.png-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2832" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-78055186654bf34e8b9c2e-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2833" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1556754978548f8a6687e6b-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2838" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1739420866548f89fe3cfc6-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2854" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-280583476548f88dfc67c1-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2857" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Erika Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1013646638548f887792308-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2955" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3444 Huon Highway, Franklin</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1761573029548f8844b3f5c-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="2956" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">677 The Boulevard, Eaglemont</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1048672797548f89a33bfd2-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3124" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea, Tesssssssssssst</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-50116359554ae481628843-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3254" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test Road, Wensleydale</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-22939885954c0998d660d6-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3256" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Testing Only, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-83638726754c18c847c795-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3280" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Live Test, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-53129287054c5df9282c9b-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3281" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Live Test2, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-194877726154c5e28a7a015-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3282" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test Live Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-33180472354c6d5eda10fd-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3283" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test Ad Denies, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/house-avatar.png-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3284" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Testing Yes, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-107514264254c5f52679a96-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3337" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test House, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-185500405554d00806ef138-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3355" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-30298588154d2c72a05e2f-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3364" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test Admin, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-35585050254d450cfbe1f5-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3523" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">Zenia/12 Test  3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-203768181854f52c47396a6-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3640" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">15 Test 3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-365087619550acfacd2754-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3661" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">Repub/14 3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-738596992550f5713df30b-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3662" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">10 Test Now Parser 3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1627136755550f62c5889eb-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3683" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">Test/78 3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-14725373355135c3e78be4-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3721" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">Ad/13/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-2072279414551a3a6c59789-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3735" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-2046363492551b4902e3e49-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3842" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-489263257552dfd8944705-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3884" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">Test/3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-10144432585534c47b57a7f-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3998" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-8586207355549770e9ac16-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="3999" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample1 Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-172729000755497addab97f-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="4000" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Test3 Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-12471707455497c7b0745c-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                              <li>
                                 <a href="4013" data-pd-item="show" class="property-switcher clearfix">
                                    <div id="address_caption" class="address pull-left">3/12 Sample Road, Chelsea</div>
                                    <div class="pr ppi-sq photo ">
                                       <span class="_c">
                                       <img src="../../assets/uploads/thumbnails/4483-1509587931554c09a25ae3e-350x350_tmb.jpg">
                                       </span>
                                    </div>
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div class="with-slide-content">
                        <div class="tab-content">
                           <div class="tab-pane active" id="userSetting">
                              <h3 class="f33">Credit Card</h3>
                              <p class="v-lighter-text"><i>
                                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque optio facere, debitis voluptates ratione alias cumque. 
                                 </i>
                              </p>
                              <br>
                              <?php include 'partials/card-table.php'; ?>
                              <?php include 'partials/update-card-details.php'; ?>
                           </div>
                           <div class="tab-pane" id="ownerSetting">
                              <h3 class="f33">Notification Settings</h3>
                              <p class="v-lighter-text"><i>These settings affect ALL your rental properties. If you would like to customise the settings for individual properties, go to Property Settings.</i></p>
                              <br>
                              <h3 class="ma-line"><span class="text-de ">Rental Enquiries</span></h3>
                              <div class="swtch-wrap clearfix">
                                 <div class="col-md-6">
                                    <h4>SMS Alerts</h4>
                                    <p>When tenants contact us regarding your property, you will automatically get an email and SMS alert. You can choose to turn your SMS alerts ON or OFF.</p>
                                 </div>
                                 <div class="col-md-1"></div>
                                 <div class="col-md-5 text-center">
                                    <p>&nbsp;</p>
                                    <div>
                                       <div class="onoffswitch clearfix inline-block va-middle mnm">
                                          <form action="#" method="post" accept-charset="utf-8" id="frmUserSetting">
                                             <div style="display:none">
                                                <input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
                                             </div>
                                             <input type="hidden" name="type" value="user">
                                             <input type="hidden" name="notify" value="sms">
                                             <input type="hidden" name="allow" id="allow" value="">
                                          </form>
                                          <input type="checkbox" name="alert1" class="onoffswitch-checkbox" id="alert1" checked="checked">
                                          <label id="popLabel" class="onoffswitch-label ui-popover" for="alert1" data-trigger="hover" data-original-title="SMS Switch" data-content="Turn off to disable SMS Alerts for all your properties" data-placement="left">
                                             <div class="onoffswitch-inner"></div>
                                             <div class="onoffswitch-switch"></div>
                                          </label>
                                       </div>
                                    </div>
                                    <div id="switchMsg"></div>
                                 </div>
                              </div>
                              <div class="swtch-wrap clearfix">
                                 <div class="col-md-6">
                                    <h4>Email Alerts</h4>
                                    <p>When tenants contact us regarding your property, you will automatically get an email and SMS alert. You can choose to turn your Email alerts ON or OFF.</p>
                                 </div>
                                 <div class="col-md-1"></div>
                                 <div class="col-md-5 text-center">
                                    <p>&nbsp;</p>
                                    <div>
                                       <div class="onoffswitch clearfix inline-block va-middle mnm">
                                          <form action="#" method="post" accept-charset="utf-8" id="frmUserEmailSetting">
                                             <div style="display:none">
                                                <input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
                                             </div>
                                             <input type="hidden" name="type" value="user">
                                             <input type="hidden" name="notify" value="email">
                                             <input type="hidden" name="allow" id="allow" value="">
                                          </form>
                                          <input type="checkbox" name="alertemail" class="onoffswitch-checkbox" id="alertemail" checked="checked">
                                          <label id="popLabel" class="onoffswitch-label ui-popover" for="alertemail" data-trigger="hover" data-original-title="SMS Switch" data-content="Turn off to disable Email Alerts for all your properties" data-placement="left">
                                             <div class="onoffswitch-inner"></div>
                                             <div class="onoffswitch-switch"></div>
                                          </label>
                                       </div>
                                    </div>
                                    <div id="switchMsgEmail"></div>
                                 </div>
                              </div>
                              <script>
                                 var tooltipInfo = ["Switch on to allow you to turn SMS Alerts ON or OFF in your Property Settings.","Turn off to disable SMS Alerts for all your properties"]
                              </script>				
                           </div>
                           <div class="tab-pane" id="propertySetting">
                              <h3 id="cap_address" class="f33"><b>a1 Happy St. Bendigo</b></h3>
                              <p class="v-lighter-text"><i>These settings only affect <span class="addy"></span>. To change the notification settings for all your properties at once go to Notification Settings.</i></p>
                              <h3 class="ma-line"><span class="text-de">Rental Enquiries</span></h3>
                              <div class="swtch-wrap clearfix">
                                 <div class="col-md-6">
                                    <h4>SMS Alerts</h4>
                                    <p>Every time a tenant calls or emails us about <span class="addy"></span> we will send you an SMS. You can choose to turn these SMS alerts ON or OFF.</p>
                                 </div>
                                 <div class="col-md-1"></div>
                                 <div class="col-md-5 text-center">
                                    <p>&nbsp;</p>
                                    <div class="onoffswitch clearfix inline-block va-middle mnm">
                                       <input type="checkbox" name="alert5" class="onoffswitch-checkbox" id="alert5" checked="checked">
                                       <label class="onoffswitch-label" for="alert5">
                                          <div class="onoffswitch-inner"></div>
                                          <div class="onoffswitch-switch"></div>
                                       </label>
                                    </div>
                                    <div id="propSwitchMsg"></div>
                                    <br>
                                    <div id="offPropSwitch" class="text-warning text-center" style="display: none;">
                                       <p>You'll need to change your SMS alerts in your 
                                          <a data-toggle="tab" href="#ownerSetting">Notification Settings</a> before you can turn it back on for 
                                          <span class="addy"></span>
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <form action="#" method="post" accept-charset="utf-8" id="frmUserPropertySetting">
                                 <div style="display:none">
                                    <input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
                                 </div>
                                 <input type="hidden" name="type" value="prop">
                                 <input type="hidden" name="notify" value="sms">
                                 <input type="hidden" value="0" id="sub_id" name="sub_id">
                                 <input type="hidden" name="allowp" id="allowp" value="">
                              </form>
                              <h3 class="ma-line"><span class="text-de">Invite Owners</span></h3>
                              <form action="#" method="post" accept-charset="utf-8" id="frmInviteOwner">
                                 <div style="display:none">
                                    <input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
                                 </div>
                                 <div class="control-group">
                                    <label class="control-label" for="inviteEmailAddress">Enter the email address you want to add as an owner</label>
                                    <div class="controls">
                                       <input type="hidden" name="property" id="property" value="">
                                       <input id="inviteEmailAddress" data-is-required="true" data-type="email" class="form-control fc-large" maxlength="50" name="inviteEmailAddress" type="text" autocomplete="off" placeholder="Enter Email">
                                    </div>
                                 </div>
                                 <div class="control-group">
                                    <div class="controls">
                                       <button id="btnInvite" class="btn btn-primary btn-lg">Add</button>
                                    </div>
                                 </div>
                              </form>
                              <ul id="ownerlist" class="basic-lists">
                              </ul>
                           </div>
                           <div class="tab-pane" id="propertySetting">
                              <h3 id="cap_address" class="f33"><b>a1 Happy St. Bendigo</b></h3>
                              <p class="v-lighter-text"><i>These settings only affect <span class="addy"></span>. To change the notification settings for all your properties at once go to Notification Settings.</i></p>
                              <h3 class="ma-line"><span class="text-de">Rental Enquiries</span></h3>
                              <div class="swtch-wrap clearfix">
                                 <div class="col-md-6">
                                    <h4>SMS Alerts</h4>
                                    <p>Every time a tenant calls or emails us about <span class="addy"></span> we will send you an SMS. You can choose to turn these SMS alerts ON or OFF.</p>
                                 </div>
                                 <div class="col-md-1"></div>
                                 <div class="col-md-5 text-center">
                                    <p>&nbsp;</p>
                                    <div class="onoffswitch clearfix inline-block va-middle mnm">
                                       <input type="checkbox" name="alert5" class="onoffswitch-checkbox" id="alert5" checked="checked">
                                       <label class="onoffswitch-label" for="alert5">
                                          <div class="onoffswitch-inner"></div>
                                          <div class="onoffswitch-switch"></div>
                                       </label>
                                    </div>
                                    <div id="propSwitchMsg"></div>
                                    <br>
                                    <div id="offPropSwitch" class="text-warning text-center" style="display: none;">
                                       <p>You'll need to change your SMS alerts in your 
                                          <a data-toggle="tab" href="#ownerSetting">Notification Settings</a> before you can turn it back on for 
                                          <span class="addy"></span>
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <form action="#" method="post" accept-charset="utf-8" id="frmUserPropertySetting">
                                 <div style="display:none">
                                    <input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
                                 </div>
                                 <input type="hidden" name="type" value="prop">
                                 <input type="hidden" name="notify" value="sms">
                                 <input type="hidden" value="0" id="sub_id" name="sub_id">
                                 <input type="hidden" name="allowp" id="allowp" value="">
                              </form>
                              <h3 class="ma-line"><span class="text-de">Invite Owners</span></h3>
                              <form action="#" method="post" accept-charset="utf-8" id="frmInviteOwner">
                                 <div style="display:none">
                                    <input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
                                 </div>
                                 <div class="control-group">
                                    <label class="control-label" for="inviteEmailAddress">Enter the email address you want to add as an owner</label>
                                    <div class="controls">
                                       <input type="hidden" name="property" id="property" value="">
                                       <input id="inviteEmailAddress" data-is-required="true" data-type="email" class="form-control fc-large" maxlength="50" name="inviteEmailAddress" type="text" autocomplete="off" placeholder="Enter Email">
                                    </div>
                                 </div>
                                 <div class="control-group">
                                    <div class="controls">
                                       <button id="btnInvite" class="btn btn-primary btn-lg">Add</button>
                                    </div>
                                 </div>
                              </form>
                              <ul id="ownerlist" class="basic-lists">
                              </ul>
                           </div>
                           <div class="tab-pane" id="credits">
                              <h3 class="f33">My Credits</h3>
                              <p class="v-lighter-text"><i>Get rewarded for sharing with your friends. Earn up to $81 for every person you invite.</i></p>
                              <br>
                              <div class="swtch-wrap clearfix">
                                 <div class="col-md-12 text-center">
                                    <h1 class="theme-color f65 normal-weight"><sup>$</sup>760</h1>
                                    <h3 class="mnu-38">My Credits</h3>
                                    <a href="https://members-dev.rentmyestate.com.au/credits" class="dff-wid btn btn-primary f18 btn-xxxlarge">
                                    Earn more credits now
                                    </a>
                                 </div>
                              </div>
                              <br>
                              <h3 class="ma-line"><span class="text-de ">Referrals</span></h3>
                              <table class="table table-striped table-hover sd-table" style="max-width:1156px">
                                 <tbody>
                                    <tr>
                                       <th width="65%">Name / Email</th>
                                       <th width="20%">Status</th>
                                       <th width="15%">Credits</th>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   </body>



   <script>

   $(function(){
      $('.editCard').click(function(){
         
         $('#card-table').addClass('tpl-hidden');
         $('#updateCardInfo').removeClass('tpl-hidden');

         return false;
      })
   });

    
   


   </script>


</html>