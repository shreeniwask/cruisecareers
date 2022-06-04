CruiseWebsite.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
     // Use $urlRouterProvider to configure any redirects (when) and invalid urls
       // (otherwise).
     $urlRouterProvider
     .otherwise('/home');
     $stateProvider
     .state("login", {
      url: "/login?error",
      templateUrl: 'modules/user/partials/login.html',
      controller: 'Register_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/job_fair/user/services-user_job_fair.js',
         'modules/job_fair/user/service-user_walkin.js',
         'modules/user/controller-register.js'
         ],{serie: true} );
       }]
      }
     }).state("register", {
      url: "/register",
      templateUrl: 'modules/user/partials/register.html',
      controller: 'Register_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-register.js',
         'modules/job_fair/user/services-user_job_fair.js',
         'modules/job_fair/user/service-user_walkin.js'
         ],{serie: true} );
       }]
      }
     }).state("forgotpassword", {
      url: "/forgotpassword",
      templateUrl: 'modules/user/partials/forgot_password.html',
      controller: 'Register_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-register.js',
         'modules/job_fair/user/services-user_job_fair.js',
         'modules/job_fair/user/service-user_walkin.js'
         ],{serie: true} );
       }]
      }
     }).state("chooseopts", {
          url: "/chooseopts",
          templateUrl: 'modules/user/partials/chooseotps.html',
          controller: 'chooseotp_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/profile/services-profile.js',
             'modules/user/controller-register.js',
            ' modules/user/controller-chooseotp.js'
             ],{serie: true} );
           }]
          }
     }).state("resetforgetpassword", {
          url: "/resetforgetpassword",
          templateUrl: 'modules/user/partials/resetpassword.html',
          controller: 'resetfrgtpass_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/profile/services-profile.js',
             'modules/user/controller-register.js',
             'modules/user/controller-resetforgetpassword.js'
             ],{serie: true} );
           }]
          }
     }).state("user_Interview_Assessment", {
       url: "/user_Interview_Assessment",
       templateUrl: 'modules/legal/user_Interview_Assessment.html',
       controller: 'UserInterviewAssessment_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([ 
                'modules/Admin/controller-user_Interview_Assessment.js',
                'modules/Admin/services-admin.js',
                'modules/user/services-dashboardDetails.js'
                
             ],{serie: true} );
           }]
          }
     }).state("terms_conditions", {
      url: "/terms_conditions",
      templateUrl: 'modules/legal/terms_conditions.html',
     }).state("privacy_policy", {
      url: "/privacy_policy",
      templateUrl: 'modules/legal/privacy_policy.html',
     }).state("home", {
      url: "/home",
      templateUrl: 'modules/user/partials/dashboard.html',
      controller: 'Login_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/user/controller-login.js',
         'modules/job_fair/user/services-user_job_fair.js',
         'modules/job_fair/user/service-user_walkin.js',
         'modules/user/controller-register.js'                               
         ],{serie: true} );
       }]
      }
     }).state("testimonials", {
      url: "/testimonials",
      templateUrl: 'modules/user/partials/testimonials.html',
      controller: 'Login_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/user/controller-login.js'
         ],{serie: true} );
       }]
      }
     }).state("comingsoon", {
      url: "/comingsoon",
      templateUrl: 'modules/user/partials/coming_soon.html'
     }).state("restricted", {
      abstract: true,
      url: "",
      templateUrl: 'modules/layouts/restricted.html',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/job_fair/user/services-user_job_fair.js',
         'modules/job_fair/user/service-user_walkin.js',
         'modules/user/controller-register.js',
         'modules/dashboard/controller-dashboard.js',
         'modules/profile/controller-profile.js',
         'modules/layouts/controller_header.js'
         ], {serie: true} );
       }]
      }
     })// -- PAGES --
     .state("restricted.profile", {
      url: "/myprofile",
      templateUrl: 'modules/profile/partials/my_profile.html',
      controller: 'Profile_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-register.js',
         'modules/dashboard/controller-dashboard.js',
         'modules/profile/controller-profile.js',
         'modules/layouts/controller_header.js'
         ],{serie: true});
       }]
   
      }
     }).state("restricted.dashboard", {
      url: "/dashboard",
      templateUrl: 'modules/dashboard/partials/dashboard.html',
      controller: 'Dashboard_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/dashboard/services-dashboard.js',
         'modules/dashboard/controller-dashboard.js',
         'modules/user/services-dashboardDetails.js',
         'modules/workflow/owner/services-owner-dashboard.js',
         'modules/job_fair/user/services-user_job_fair.js',
         'modules/job_fair/user/service-user_walkin.js',
         'modules/workflow/owner/services-workflowDashboard.js'
         
          
         ],{serie: true});
       }]
      }
     }).state("restricted.myapplication", {
      url: "/myapplication",
      templateUrl: 'modules/profile/partials/my_application.html',
      controller: 'Profile_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/dashboard/services-dashboard.js',
         'modules/profile/controller-e_profile.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.my_notification", {
          url: "/mynotification",
          templateUrl: 'modules/profile/partials/my_notification.html',
          controller: 'notification_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/profile/controller-notification.js',
             'modules/profile/services-notification.js',
             'modules/profile/services-profile.js',
             'modules/user/controller-register.js',
             'modules/layouts/controller_header.js'
             ],{serie: true});
           }]
          }
         }).state("restricted.todolist", {
      url: "/to-do-list",
      templateUrl: 'modules/profile/partials/to-do-list.html',
      controller: 'Profile_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/dashboard/services-dashboard.js',
         'modules/profile/controller-profile.js'
         ],{serie: true});
       }]
      }
     }).state("job_result", {
      url: "/job-result?search",
      templateUrl: 'modules/user/partials/job-result.html',
      controller: 'JobResult_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-jobResult.js'
         ],{serie: true});
       }]
      }
     }).state("job_results", {
      url: "/job-result/:categoryId/:flag",
      templateUrl: 'modules/user/partials/job-result.html',
      controller: 'JobResult_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-jobResult.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.job_results", {
      url: "/job-results/:categoryId/:flag",
      templateUrl: 'modules/user/partials/job-result.html',
      controller: 'JobResult_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-jobResult.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.job_result", {
      url: "/job-results",
      templateUrl: 'modules/user/partials/job-result.html',
      controller: 'JobResult_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-jobResult.js'
         ],{serie: true});
       }]
      }
     }).state("jobdesc", {
      url: "/jobdesc/:jobId",
      templateUrl: 'modules/user/partials/job-desc-outer.html',
      controller: 'JobDetail_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/user/controller-job-details.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.jobdesc", {
      url: "/jobdescription/:jobId",
      templateUrl: 'modules/user/partials/job-desc-outer.html',
      controller: 'JobDetail_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-admin.js',
         'modules/user/controller-job-details.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin", {
      url: "/admin",
      templateUrl: 'modules/layouts/admin_layout.html',
      controller: 'Admin_Layout_Cntrl',
      abstract: true,
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
        'modules/user/services-login.js',
        'modules/profile/services-profile.js',                         
        'modules/user/controller-adminlayout.js'                      
         ]);
       }]
      }
     }).state("restricted.admin.dashboard", {
      url: "/dashboard",
      templateUrl: 'modules/Admin/partials/admindashboard.html',
      controller: 'AdminDashboard_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admindashboard.js',
         'modules/Admin/controller-admindashboard.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.admindashboard", {
           url: "/admin_dashboard",
           templateUrl: 'modules/Admin/partials/admin_dashboard.html',
           controller: 'Admin_Dashboard_Ctrl',
           resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                   return $ocLazyLoad.load([
                       
                       'modules/Admin/controller-admin_dashboard.js',
                       'modules/Admin/services-admin_dashboard.js',
                       'modules/user/services-login.js',
                       'modules/workflow/owner/services-owner-dashboard.js',
                       'modules/workflow/owner/services-workflowDashboard.js'
                       
                       
                       ],{serie: true});
               }]
           }
       }).state("restricted.admin.purgeconfig", {
          url: "/purgeconfig",
          templateUrl: 'modules/Admin/partials/purge_userdata_config.html',
          controller: 'purge_userdata_config_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/Admin/service-purge_userdata_config.js',
             'modules/Admin/controller-purge_userdata_config.js',
             'modules/user/services-login.js', 
                   'modules/Admin/services-admin.js',
             'modules/Admin/services-master.js',
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.purgereq", {
              url: "/purgereq",
              templateUrl: 'modules/Admin/partials/Purge_Request_List.html',
              controller: 'purge_request_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                 'modules/Admin/service-purge_request.js',
                 'modules/Admin/controller-purge_request.js',
                 'modules/user/services-login.js', 
                       'modules/Admin/services-admin.js',
                 'modules/Admin/services-master.js',
                 ],{serie: true});
               }]
              }
             }).state("restricted.admin.claimdetail", {
                  url: "/claimdetail",
                  templateUrl: 'modules/Admin/partials/claim-details-page.html',
                  controller: 'claim_details_Ctrl',
                  resolve: {
                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                     'modules/Admin/service-claim-details.js',
                     'modules/Admin/controller-claim-details.js',
                     'modules/user/services-login.js', 
                           'modules/Admin/services-admin.js',
                     'modules/Admin/services-master.js',
                     ],{serie: true});
                   }]
                  }
                 }).state("restricted.admin.freequery", {
              url: "/freequery",
              templateUrl: 'modules/Admin/partials/FreeQueryCandidate.html',
              controller: 'Free_Query_Candidate_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                 'modules/Admin/service-freeQueryCandidate.js',
                 'modules/Admin/controller-freeqQueryCandidate.js',
                 'modules/profile/services-profile.js',
                 'modules/user/services-login.js', 
                       'modules/Admin/services-admin.js',
                 'modules/Admin/services-master.js',
                 'modules/Admin/service-assessmentEngine.js',
                 'modules/documents/document_type/service_document_type_list.js',
                 'modules/Admin/service-freequeryedit.js',
                 ],{serie: true});
               }]
              }
               }).state("restricted.admin.freequeryEmployee", {
                  url: "/freequeryemployee",
                  templateUrl: 'modules/Admin/partials/FreeQueryEmployee.html',
                  controller: 'Free_Query_Employee_Ctrl',
                  resolve: {
                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                     'modules/Admin/service-freeQueryCandidate.js',
                     'modules/Admin/controller-freeQueryEmployee.js',
                     'modules/profile/services-profile.js',
                     'modules/user/services-login.js', 
                           'modules/Admin/services-admin.js',
                     'modules/Admin/services-master.js',
                     'modules/Admin/service-assessmentEngine.js',
                     'modules/documents/document_type/service_document_type_list.js',
                     'modules/Admin/service-freequeryedit.js',
                     ],{serie: true});
                   }]
                  }
             }).state("restricted.admin.freequerylist", {
                  url: "/freelist",
                  templateUrl: 'modules/Admin/partials/FreeQueryList.html',
                  controller: 'Free_Query_List_Ctrl',
                  resolve: {
                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                     'modules/Admin/service-freequerylist.js',
                     'modules/Admin/controller-freequerylist.js',
                     'modules/user/services-login.js', 
                           'modules/Admin/services-admin.js',
                           'modules/Admin/service-freeQueryCandidate.js',
                           'modules/Admin/service-freequeryedit.js',
                     'modules/Admin/services-master.js'
                     
                     ],{serie: true});
                   }]
                  }
                 }).state("restricted.admin.freequeryedit", {
                      url: "/freequeryedit",
                      templateUrl: 'modules/Admin/partials/FreeQueryEdit.html',
                      controller: 'Free_Query_Edit_Ctrl',
                      resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                         'modules/Admin/service-freequeryedit.js',
                         'modules/Admin/controller-freequeryedit.js',
                         'modules/profile/services-profile.js',
                         'modules/user/services-login.js', 
                               'modules/Admin/services-admin.js',
                               'modules/Admin/service-freeQueryCandidate.js',
                         'modules/Admin/services-master.js',
                         'modules/Admin/service-assessmentEngine.js',
                         'modules/documents/document_type/service_document_type_list.js'
                         
                         ],{serie: true});
                       }]
                      }
                     }).state("restricted.dashboardDetails", {
      url: "/dashboardDetails",
      templateUrl: 'modules/user/partials/dashboardDetails.html',
      controller: 'dashboardDetails_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
         'modules/dashboard/services-dashboard.js',
         'modules/user/controller-dashboardDetails.js',
         'modules/user/services-dashboardDetails.js',
         'modules/document/controller-upload_doc_list.js',      
         'modules/document/service-upload_doc_list.js',
         'modules/Admin/services-master.js',
         'modules/Admin/services-admin.js'
   
         ],{serie: true});
       }]
      }
     }).state("restricted.testPlayer", {
      url: "/testPlayer",
      templateUrl: 'modules/user/partials/testPlayer.html',
      controller: 'testPlayer_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([      
         'modules/user/controller-testPlayer.js',
         'modules/user/services-dashboardDetails.js',
         'modules/user/services-login.js',
         'modules/profile/services-profile.js',
   
         ],{serie: true});
       }]
      }
     }).state("restricted.changepassword", {
          url: "/changepassword",
          templateUrl: 'modules/user/partials/changePassword.html',
          controller: 'changePassword_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/profile/services-profile.js',
             'modules/user/controller-changePassword.js',
             'modules/user/service-resetPassword.js'
             ],{serie: true} );
           }]
          }
     
     }).state("restricted.admin.changepasswordAdmin", {
          url: "/changepasswordadmin",
          templateUrl: 'modules/Admin/partials/changePasswordAdmin.html',
          controller: 'changePassword_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/profile/services-profile.js',
             'modules/user/controller-changePassword.js',
             'modules/user/service-resetPassword.js'
             ],{serie: true} );
           }]
          }
     }).state("changepassword", {
          url: "/changepasswordadminnew",
          templateUrl: 'modules/user/partials/changePassword.html',
          controller: 'changePassword_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/profile/services-profile.js',
             'modules/user/controller-changePassword.js',
             'modules/user/service-resetPassword.js'
             ],{serie: true} );
           }]
          }
     }).state("restricted.admin.createjobs", {
      url: "/createPostedJob",
      templateUrl: 'modules/Admin/partials/createpostedjob.html',
      controller: 'CreateEditJob_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/controller-createeditjob.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.customerrequisition", {
      url: "/customerrequisition",
      templateUrl: 'modules/Admin/partials/CustomerRequisition.html',
      controller: 'Requistion_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/user/services-login.js',
         'modules/Admin/services-customerrequistion.js',
         'modules/Admin/controller-customerrequisition.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.createrequisition", {
      url: "/createrequisition",
      templateUrl: 'modules/Admin/partials/CreateRequisition.html',
      controller: 'CreateRequistion_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/Admin/services-customerrequistion.js',
         'modules/Admin/controller-createrequisition.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.adminpostedjobs", {
      url: "/adminpostedjobs",
      templateUrl: 'modules/Admin/partials/AdminPostedJobs.html',
      controller: 'PostedJobs_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/controller-postjobs.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.appliedjobs", {
      url: "/appliedjobs",
      templateUrl: 'modules/Admin/partials/appliedjobs.html',
      controller: 'Appliedjobs_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-customerrequistion.js',
         'modules/Admin/controller-appliedjobs.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/Admin/services-master.js',
         'modules/Admin/ngClickCopy.js'
   
   
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.walkin_schedular", {
          url: "/walkinschdedular",
          templateUrl: 'modules/Admin/partials/walkin_schedular.html',
          controller: 'Walkins_Scheduler_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
                'modules/user/services-login.js',
                'modules/Admin/services-admin.js',
                'modules/Admin/controller-walkin_schedualr.js'
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.walkin", {
          url: "/walkin",
          templateUrl: 'modules/Admin/partials/walkin.html',
          controller: 'WalkIn_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/Admin/service-walkin.js',
             'modules/Admin/controller-walkin.js'
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.walkinlist", {
              url: "/walkinlist",
              templateUrl: 'modules/Admin/partials/walkinList.html',
              controller: 'WalkInList_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                 'modules/Admin/service-walkinList.js',
                 'modules/Admin/controller-walkinList.js',
                 'modules/Admin/controller-createEventscheduler.js',
                 ],{serie: true});
               }]
              }
       }).state("restricted.admin.createwalkin", {
              url: "/creatwalkin",
              templateUrl: 'modules/Admin/partials/createWalkin.html',
              controller: 'CreateWalkIn_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                 'modules/Admin/service-createwalkin.js',
                 'modules/Admin/controller-createwalkin.js',
                 'modules/Admin/service-walkinList.js'
                 ],{serie: true});
               }]
              }
             }).state("restricted.admin.flagsetting", {
              url: "/FlagSettings",
              templateUrl: 'modules/Admin/partials/FlagSettings.html',
              controller: 'FlagSettings_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                 'modules/Admin/controller-flag-settings.js',
                 'modules/Admin/services-admin.js',
                 ],{serie: true});
               }]
              }
           }).state("restricted.admin.candidatelist", {
          url: "/candidatelist",
          templateUrl: 'modules/Admin/partials/candidatelist.html',
          controller: 'CandidateDetail_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/Admin/services-admin.js',
             'modules/profile/services-profile.js',
             'modules/Admin/services-customerrequistion.js',
            'modules/Admin/controller-candidatelist.js',
              'modules/Admin/service-assessmentEngine.js',
             'modules/profile/controller-profile.js',
             'modules/Admin/services-master.js',
             'modules/Admin/ngClickCopy.js'
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.eventScheduler", {
      url: "/eventScheduler",
      templateUrl: 'modules/Admin/partials/eventScheduler.html',
      controller: 'EventScheduler_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/controller-eventscheduler.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.createNewScheduler", {
      url: "/createNewScheduler",
      templateUrl: 'modules/Admin/partials/createnewscheduler.html',
      controller: 'CreateScheduler_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/controller-createscheduler.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.accessright", {
          url: "/accessright",
          templateUrl: 'modules/Admin/partials/accessRight.html',
          controller: 'AccessRight_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
             'modules/user/services-login.js',
             'modules/Admin/services-admin.js',
             'modules/Admin/controller-access-right.js',
             'modules/Admin/service-access-right.js'
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.createEventscheduler", {
      url: "/createEventsScheduler",
      templateUrl: 'modules/Admin/partials/createEventscheduler.html',
      controller: 'CreateEventScheduler_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/controller-createEventscheduler.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.emailConfig", {
      url: "/emailConfig",
      templateUrl: 'modules/Admin/partials/emailConfig.html',
     }).state("restricted.admin.schedulermaster", {
          url: "/schedulermaster",
          templateUrl: 'modules/Admin/partials/schedulermaster.html',
          controller: 'schedulermaster_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([                            
                  'modules/user/services-login.js',                     
                  'modules/Admin/controller-schedulermaster.js',      
                  'modules/Admin/service-schedulermaster.js',
                  'modules/Admin/services-master.js',
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.createscheduleractivity", {
              url: "/createscheduleractivity",
              templateUrl: 'modules/Admin/partials/createscheduleractivity.html',
              controller: 'CreateSchedulerActivity_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([                            
                      'modules/user/services-login.js',                     
                      'modules/Admin/controller-createscheduleractivity.js',      
                      'modules/Admin/service-createscheduleractivity.js',
                      'modules/Admin/services-master.js',
                 ],{serie: true});
               }]
              }
             }).state("restricted.admin.editscheduleractivity", {
                  url: "/editscheduleractivity",
                  templateUrl: 'modules/Admin/partials/editscheduleractivity.html',
                  controller: 'EditSchedulerActivity_Ctrl',
                  resolve: {
                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([                            
                          'modules/user/services-login.js',                     
                          'modules/Admin/controller-editscheduleractivity.js',      
                          'modules/Admin/service-editscheduleractivity.js',
                          'modules/Admin/services-master.js',
                     ],{serie: true});
                   }]
                  }
                 }).state("restricted.admin.smsConfig", {
          url: "/smsConfig",
          templateUrl: 'modules/Admin/partials/smsConfig.html',
          controller: 'sms_configuration_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([                            
                  'modules/user/services-login.js',                     
                  'modules/document/controller-sms_configuration.js',      
                  'modules/document/service-sms_configuration.js',
                  'modules/Admin/services-master.js',
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.templateMaster", {
      url: "/templateMaster",
      templateUrl: 'modules/Admin/partials/templateMaster.html',
      controller: 'Templatemaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/controller-templatemaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.createtemplate", {
      url: "/createtemplate",
      templateUrl: 'modules/Admin/partials/createTemplate.html',
      controller: 'CreateTemplate_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/controller-createtemplate.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.templatetypemaster", {
      url: "/templatetypemaster",
      templateUrl: 'modules/Admin/partials/templateTypeMaster.html',
      controller: 'TemplateTypeMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-templatetypemaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.communicationCenter", {
      url: "/communicationCenter",
      templateUrl: 'modules/Admin/partials/communicationCenter.html',
     }).state("restricted.admin.brandmaster", {
      url: "/brandmaster",
      templateUrl: 'modules/Admin/partials/brandmaster.html',
      controller: 'BrandsMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-brandmaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.departmentmaster", {
      url: "/departmentmaster",
      templateUrl: 'modules/Admin/partials/departmentmaster.html',
      controller: 'CategoryMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-categorymaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.positionmaster", {
      url: "/positionmaster",
      templateUrl: 'modules/Admin/partials/positionmaster.html',
      controller: 'Positionmaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-positionmaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.compliancemaster", {
      url: "/compliancemaster",
      templateUrl: 'modules/Admin/partials/compliancemaster.html',
      controller: 'ComplianceMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-compliancemaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.assessmentmaster", {
      url: "/assessmentmaster",
      templateUrl: 'modules/Admin/partials/assessmentMaster.html',
      controller: 'Assessmentmaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-assessmentMaster.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/user/services-dashboardDetails.js',
         'modules/Admin/services-admin.js'
   
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.surveymaster", {
      url: "/surveymaster",
      templateUrl: 'modules/Admin/partials/SurveyMaster.html',
      controller: 'Assessmentmaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-assessmentMaster.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/user/services-dashboardDetails.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/controller-CreateAssessments.js'
         ],{serie: true});
       }]
      }
     })
     
     .state("restricted.admin.questionCategoryMaster", {
      url: "/questioncategory",
      templateUrl: 'modules/Admin/partials/questionCategoryMaster.html',
      controller: 'Question_Category_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-questionCategoryMaster.js',
         'modules/Admin/controller-questionCategoryMaster.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.qualification", {
      url: "/qualification",
      templateUrl: 'modules/Admin/partials/qualificationMaster.html',
      controller: 'Qualification_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-master.js',
         'modules/Admin/controller-qualification.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.chat", {
      url: "/chat_admin",
      templateUrl: 'modules/Admin/partials/chat_admin.html',
      controller: 'chatAdmin_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-chat_admin.js',
         'modules/Admin/controller-chat_admin.js'
         ],{serie: true});
       }]
      }
   
     }).state("restricted.admin.AssessmentHistory", {
      url: "/AssessmentHistory",
      templateUrl: 'modules/Admin/partials/AssessmentHistory.html',
      controller: 'AssessmentHistory_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/Admin/services-master.js',
         'modules/Admin/controller-Assessmenthistory.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.cms", {
      url: "/cms",
      templateUrl: 'modules/Admin/partials/cms.html',
      controller: 'Cms_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-cms.js',
         'modules/Admin/controller-cms.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.compliancesmatrix", {
      url: "/compliancesmatrix",
      templateUrl: 'modules/Admin/partials/compliancesMatrix.html',
      controller: 'ComplianceMatrix_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-compliancesMatrix.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.jobseekerreadinessreport", {
      url: "/jobseekerreadinessreport",
      templateUrl: 'modules/Admin/partials/jobseekerreadinessreport.html',
      controller: 'ReadinessReport_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/services-report.js',
         'modules/Admin/controller-employeereadinessreport.js'                            
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.CreateAssessment", {
      url: "/CreateAssessment",
      templateUrl: 'modules/Admin/partials/CreateAssessment.html',
      controller: 'CreateAssessment_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([ 
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/controller-CreateAssessments.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/user/services-dashboardDetails.js',
         'modules/Admin/services-master.js'
   
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.FilterForassessment", {
      url: "/FilterForassessment",
      templateUrl: 'modules/Admin/partials/FilterForassessment.html',
      controller: 'CreateAssessment_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([ 
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/controller-CreateAssessments.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/user/services-dashboardDetails.js',
         'modules/Admin/services-master.js'
   
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.interviewtemplate", {
      url: "/interviewtemplate",
      templateUrl: 'modules/Admin/partials/interviewtemplate.html',
      controller: 'InterviewTemplater_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/services-master.js',
         'modules/Admin/services-interview.js',
         'modules/Admin/controller-InterviewTemplate.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.createInterviewTemplate", {
      url: "/createInterviewTemplate",
      templateUrl: 'modules/Admin/partials/createinterviewtemplate.html',
      controller: 'InterviewTemplater_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/services-master.js',
         'modules/Admin/services-interview.js',
         'modules/Admin/controller-InterviewTemplate.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.uploadmaster", {
      url: "/uploadshipdata",
      templateUrl: 'modules/Admin/partials/uploadshipdata.html',
      controller: 'ShipData_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/services-shipdata.js',
         'modules/Admin/controller-shipdataupload.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.questionnair", {
      url: "/questionbank",
      templateUrl: 'modules/Admin/partials/questionaaire-bank.html',
      controller: 'questionbank_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/services-master.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/Admin/controller-questionbank.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.testimonials", {
      url: "/testimonials",
      templateUrl: 'modules/Admin/partials/testimonials.html',
      controller: 'Testimonials_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/Admin/services-master.js',
         'modules/Admin/services-testimonials.js',
         'modules/Admin/controller-testimonials.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.claimReimbursment", {
      url: "/claimReimbursment",
      templateUrl: 'modules/profile/partials/claimReimbursment.html',
      controller: 'claimReimbursment_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([                            
              'modules/user/services-login.js',                     
              'modules/profile/services-profile.js',      
              'modules/profile/services-e_profile.js',
              'modules/user/services-dashboardDetails.js',
              'modules/dashboard/controller-dashboard.js',
              'modules/profile/controller-e_profile.js', 
              'modules/profile/controller-claimReimbursment.js',
         ],{serie: true});
       }]
      }
     }).state("restricted.admin.emailtypes", {
          url: "/emaillogdetail",
          templateUrl: 'modules/document/partials/emaillogdetail.html',
          controller: 'emaillogdetail_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([                            
                  'modules/user/services-login.js', 
                  'modules/Admin/services-admin.js',
                  'modules/document/controller-emaillogdetail.js',      
                  'modules/document/service-emaillogdetail.js',
                  'modules/Admin/services-master.js',
             ],{serie: true});
           }]
          }
         }).state("restricted.admin.emailconfig", {
              url: "/emailconfig",
              templateUrl: 'modules/document/partials/email_configuration.html',
              controller: 'email_configuration_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([                            
                      'modules/user/services-login.js',                     
                      'modules/document/controller-email_configuration.js',      
                      'modules/document/service-email_configuration.js',
                      'modules/Admin/services-master.js',
                 ],{serie: true});
               }]
              }
             }).state("restricted.admin.uploaddoclist", {
                  url: "/uploaddoclist",
                  templateUrl: 'modules/document/partials/upload_doc_list.html',
                  controller: 'Upload_Doc_List_Ctrl',
                  resolve: {
                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([                            
                          'modules/user/services-login.js', 
                          'modules/Admin/services-admin.js',
                          'modules/document/controller-upload_doc_list.js',      
                          'modules/document/service-upload_doc_list.js',
                          'modules/Admin/services-master.js',
                     ],{serie: true});
                   }]
                  }
                 }).state("restricted.uploaddocs", {
                      url: "/uploaddocs",
                      templateUrl: 'modules/document/partials/upload_docs.html',
                      controller: 'Upload_Docs_Ctrl',
                      resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([                            
                              'modules/user/services-login.js',                     
                              'modules/document/controller-upload_docs.js',      
                              'modules/document/service-upload_docs.js',
                              'modules/Admin/services-master.js',
                         ],{serie: true});
                       }]
                      }
                     }).state("restricted.admin.uploaddocconfig", {
                          url: "/uploaddocconfig",
                          templateUrl: 'modules/document/partials/document_configuration.html',
                          controller: 'Document_Config_Ctrl',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([                            
                                  'modules/user/services-login.js',
                                  'modules/Admin/services-admin.js',
                                  'modules/document/controller-document_configuration.js',      
                                  'modules/document/service-document_configuration.js',
                                  'modules/Admin/services-master.js',
                             ],{serie: true});
                           }]
                          }
                         }).state("restricted.admin.uploaddoclog", {
                              url: "/uploaddoclog",
                              templateUrl: 'modules/document/partials/document_log.html',
                              controller: 'Document_Log_Ctrl',
                              resolve: {
                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([                            
                                      'modules/user/services-login.js',
                                      'modules/Admin/services-admin.js',
                                      'modules/document/controller-document_log.js',      
                                      'modules/document/service-document_log.js',
                                      'modules/Admin/services-master.js',
                                 ],{serie: true});
                               }]
                              }
                             }).state("restricted.admin.crewmembercompliancemapping", {
      url: "/crewmembercompliancemapping",
      templateUrl: 'modules/Admin/partials/crewmembercompliancemapping.html',
      controller: 'CrewComplianceMapping_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',
         'modules/Admin/services-master.js',
         'modules/Admin/service-assessmentEngine.js',
         'modules/Admin/controller-crewmemcompliancemapping.js'
         ],{serie: true});
       }]
      }
     }).state("restricted.eprofile", {
         url: "/eprofile",
      templateUrl: 'modules/profile/partials/e_profile.html',
      controller: 'Employee_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
                                 
         'modules/user/services-login.js',
         'modules/Admin/services-admin.js',
         'modules/profile/services-profile.js',      
         'modules/profile/services-e_profile.js',
         'modules/user/services-dashboardDetails.js',
         'modules/dashboard/controller-dashboard.js',
         'modules/profile/controller-e_profile.js',
         'modules/document/controller-emaillogdetail.js',
         'modules/document/service-emaillogdetail.js',
         'modules/document/controller-upload_doc_list.js',      
         'modules/document/service-upload_doc_list.js',
         'modules/Admin/services-master.js'
         
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.expensemaster", {
         url: "/expensemaster",
      templateUrl: 'modules/Admin/partials/ExpenseMaster.html',
      controller: 'expenseMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
       'modules/user/services-login.js',
            'modules/Admin/services-expenseMaster.js',      
         'modules/Admin/Controller-expenseMaster.js',
         'modules/profile/services-e_profile.js',
         
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.createExpenseMaster", {
         url: "/createExpenseMaster",
      templateUrl: 'modules/Admin/partials/createExpenseMaster.html',
      controller: 'expenseMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',                    
         'modules/Admin/services-expenseMaster.js',      
         'modules/Admin/Controller-expenseMaster.js',
         'modules/profile/services-e_profile.js',
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.expneseHeadSetting", {
         url: "/expneseHeadSetting",
      templateUrl: 'modules/Admin/partials/expneseHeadSetting.html',
      controller: 'expenseMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
            'modules/user/services-login.js',                    
            'modules/Admin/services-expenseMaster.js',      
            'modules/Admin/Controller-expenseMaster.js',
            'modules/profile/services-e_profile.js',
        ],{serie: true});
       }]
      }
     }) 
     .state("restricted.admin.generateReport", {
         url: "/generateReport",
      templateUrl: 'modules/Admin/partials/generateReport.html',
      controller: 'generateReport_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
            'modules/Admin/services-generateReport.js',      
         'modules/Admin/controller-generateReport.js',
         'modules/Admin/services-master.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-assessmentMaster.js',
         'modules/Admin/service-assessmentEngine.js',
         
        ],{serie: true});
       }]
      }
     })
     
     .state("restricted.admin.shipsmaster", {
      url: "/shipsmaster",
      templateUrl: 'modules/Admin/partials/shipsmaster.html',
      controller: 'ShipsMaster_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
         'modules/user/services-login.js',
         'modules/Admin/services-master.js',
         'modules/Admin/controller-shipsmaster.js'
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.employeelist", {
      url: "/employeelist",
      templateUrl: 'modules/Admin/partials/EmployeeList.html',
      controller: 'Employee_List_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
        'modules/user/services-login.js',
        'modules/Admin/services-admin.js',
        'modules/profile/services-profile.js', 
        'modules/Admin/services-customerrequistion.js',
        'modules/Admin/services-master.js',
        'modules/profile/services-e_profile.js',
        'modules/Admin/service-assessmentEngine.js',
        'modules/Admin/services-EmployeesList.js',
        'modules/Admin/Controller-EmployeeList.js',
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.employeeexpenselist", {
      url: "/employeeexpenselist",
      templateUrl: 'modules/Admin/partials/e-expenseList.html',
      controller: 'Expenses_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
        'modules/user/services-login.js',
        'modules/Admin/services-admin.js',
        'modules/Admin/services-e_expenses.js',     
        'modules/Admin/controller-e_expenses.js',      
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.approverdashboard", {
              url: "/approverdashboard",
              templateUrl: 'modules/expense/partials/approver_dashboard.html',
              controller: 'ApproverDashboard_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                'modules/Admin/services-e_expenses.js',     
                'modules/expense/controller-approver_dashboard.js', 
                'modules/workflow/owner/services-owner-dashboard.js',
                'modules/workflow/owner/services-workflowDashboard.js'
                ],{serie: true});
               }]
              }
             }).state("restricted.admin.createAdminUser", {
         url: "/createAdminUser",
      templateUrl: 'modules/Admin/partials/createAdminUser.html',
      controller: 'createAdminUser_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
            'modules/Admin/services-createAdminUser.js',      
            'modules/Admin/controller-createAdminUser.js',       
         
        ],{serie: true});
       }]
      }                               
     }).state("restricted.admin.addUsers", {
         url: "/addusers",
      templateUrl: 'modules/Admin/partials/addUsers.html',
      controller: 'createAdminUser_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
            'modules/user/services-login.js',
            'modules/Admin/services-admin.js',                     
            'modules/Admin/services-createAdminUser.js',      
            'modules/Admin/controller-createAdminUser.js',       
         
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.surveyassignment", {
      url: "/survey_assignment",
      templateUrl: 'modules/Admin/partials/survey_assignment.html',
      controller: 'survey-assignment_Ctrl',
      resolve: {
       deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([
        'modules/user/services-login.js',
        'modules/Admin/services-admin.js',
        'modules/Admin/service-assessmentEngine.js',
        'modules/Admin/services-survey_assignment.js',     
        'modules/Admin/controller-survey_assignment.js',      
        ],{serie: true});
       }]
      }
     }).state("restricted.admin.uploadRepatData", {
          url: "/uploadrepatdatafiles",
          templateUrl: 'modules/expense/partials/upload_repat_data.html',
          controller: 'uploadRepatData_Ctrl',
          resolve: {
           deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
            'modules/user/services-login.js',
            'modules/Admin/services-admin.js',
            'modules/expense/controller-RepatData.js',
            'modules/expense/services-repatData.js',          
            ],{serie: true});
           }]
          }
     }).state("restricted.admin.repatDataList", {
         url: "/repatdatalist",
         templateUrl: 'modules/expense/partials/repataDataList.html',
         controller: 'repatDataList_Ctrl',
         resolve: {
             deps: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
                'modules/user/services-login.js',
                'modules/Admin/services-admin.js',
                'modules/expense/controller-RepatDataList.js',
                'modules/profile/services-profile.js',
                'modules/Admin/services-customerrequistion.js',
                'modules/Admin/service-assessmentEngine.js',
                'modules/Admin/services-master.js',
                'modules/expense/services-repatData.js',          
                ],{serie: true});
               }]
             }
     }).state("restricted.claimReimbursmentDetail", {
         url: "/claimReimbursmentDetail",
         templateUrl: 'modules/profile/partials/claimedReimbursementDetails.html',
         controller: 'claimReimbursment_Ctrl',
         resolve: {
             deps: ['$ocLazyLoad', function($ocLazyLoad) {
                 return $ocLazyLoad.load([                            
                      'modules/user/services-login.js',                     
                      'modules/profile/services-profile.js',      
                      'modules/profile/services-e_profile.js',
                      'modules/user/services-dashboardDetails.js',
                      'modules/dashboard/controller-dashboard.js',
                      'modules/profile/controller-e_profile.js', 
                      'modules/profile/controller-claimReimbursment.js',
                 ],{serie: true});
               }]
              }
     }).state("adminexpensedetails", {
         url: "/adminexpensedetails",
         templateUrl: 'modules/Admin/partials/expense_details.html',
         controller: 'expenseDetails_Ctrl',
         resolve: {
             deps: ['$ocLazyLoad', function($ocLazyLoad) {
                 return $ocLazyLoad.load([                            
                          'modules/user/services-login.js',                     
                          'modules/profile/services-profile.js',      
                          'modules/user/services-login.js',
                          'modules/profile/services-e_profile.js',
                          'modules/Admin/services-e_expenses.js',     
                          'modules/Admin/controller-e_expenses.js',
                          'modules/Admin/controller-expenseDetails.js'
                     ],{serie: true});
                   }]
                  }
    }).state("restricted.admin.employeedescription", {
        url: "/employeedescription",
        templateUrl: 'modules/Admin/partials/employee_description.html',
        controller: 'Employee_List_Ctrl',
        resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
               return $ocLazyLoad.load([
                   'modules/user/services-login.js',
                   'modules/Admin/services-admin.js',
                   'modules/profile/services-profile.js', 
                   'modules/Admin/services-customerrequistion.js',
                   'modules/Admin/services-master.js',
                   'modules/profile/services-e_profile.js',
                   'modules/Admin/service-assessmentEngine.js',
                   'modules/Admin/services-EmployeesList.js',
                   'modules/Admin/Controller-EmployeeList.js',
                         ],{serie: true});
               }]
           }
   }).state("restricted.admin.assessmentquestionsequencing", {
                          url: "/questionsequencing",
                          templateUrl: 'modules/Admin/partials/assessmentqueseq.html',
                          controller: 'AssessmentQueSeq_Ctrl',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                             'modules/user/services-login.js',
                             'modules/Admin/services-master.js',
                             'modules/Admin/controller-AssessmentQueSeq.js',
                             ],{serie: true});
                           }]
                          }
                     }).state("restricted.admin.surveyQuestionList", {
                          url: "/surveyquestion",
                          templateUrl: 'modules/Admin/partials/surveyQuestionList.html',
                          controller: 'SurveyQueList_Ctrl',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                             'modules/user/services-login.js',
                             'modules/Admin/services-master.js',
                             'modules/Admin/controller-SurveyQuestionList.js',
                             ],{serie: true});
                           }]
                          }
                         }).state("restricted.admin.interviewAssessementQuestionList", {
                          url: "/interviewassessementquestion",
                          templateUrl: 'modules/Admin/partials/interviewAssessementQuestionList.html',
                          controller: 'InterviewAssessmentQueList_Ctrl',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                             'modules/user/services-login.js',
                             'modules/Admin/services-master.js',
                             'modules/Admin/controller-InterviewAssessmentQuestionList.js',
                             ],{serie: true});
                           }]
                          }
                         }).state("restricted.admin.userdescription", {
                          url: "/userdescription",
                          templateUrl: 'modules/Admin/partials/user_description.html',
                          controller: 'Appliedjobs_Ctrl',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                                     
                                 'modules/user/services-login.js',
                                 'modules/Admin/services-admin.js',
                                 'modules/profile/services-profile.js',
                                 'modules/Admin/services-customerrequistion.js',
                                 'modules/Admin/controller-appliedjobs.js',
                                 'modules/Admin/service-assessmentEngine.js',
                                 'modules/Admin/services-master.js',
                                 'modules/Admin/ngClickCopy.js'
                                 
                             ],{serie: true});
                           }]
                          }
                         }).state("restricted.admin.ownerdashboarddetails", { 
                              url: "/ownerdashboarddetails",
                              templateUrl: 'modules/workflow/owner/ownerdashboard.html',
                              controller: 'Owner_Dashboard_Ctrl',
                              resolve: {
                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([						                              
                                     'modules/user/services-login.js',
                                     'modules/Admin/services-admin.js',
                                     'modules/workflow/owner/services-owner-dashboard.js',
                                     'modules/workflow/owner/services-workflowDashboard.js',
                                     'modules/workflow/owner/controller-owner-dashboard.js'
                                 ],{serie: true});
                               }]
                              }
                             }).state("restricted.admin.workflowlist", { 
                                  url: "/workflowlist",
                                  templateUrl: 'modules/workflow/admin/partials/workflowlist.html',
                                  controller: 'WorkflowList_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                                             
                                         'modules/user/services-login.js',
                                         'modules/Admin/services-admin.js',
                                         'modules/Admin/services-master.js',
                                         'modules/workflow/admin/services-workflowslist.js',
                                         'modules/workflow/admin/controller-workflowslist.js'
                                         
                                     ],{serie: true});
                                   }]
                                  }
                                 }).state("restricted.admin.createworkflow", { 
                                      url: "/createworkflow",
                                      templateUrl: 'modules/workflow/admin/partials/createWorkflow.html',
                                      controller: 'CreateWorkflow_Ctrl',
                                      resolve: {
                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                                                 
                                             'modules/user/services-login.js',
                                             'modules/Admin/services-admin.js',
                                             'modules/Admin/services-master.js',
                                             'modules/workflow/admin/services-workflowslist.js',
                                             'modules/workflow/admin/services-createWorkflow.js',
                                             'modules/Admin/services-survey_assignment.js',
                                             'modules/workflow/admin/controller-workflowslist.js',
                                             'modules/workflow/admin/controller-createWorkflow.js'
                                             
                                         ],{serie: true});
                                       }]
                                      }
                                     }).state("restricted.admin.createtask", { 
                                          url: "/createtask",
                                          templateUrl: 'modules/workflow/admin/partials/createTask.html',
                                          controller: 'CreateTask_Ctrl',
                                          resolve: {
                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                                     
                                                 'modules/user/services-login.js',
                                                 'modules/Admin/services-admin.js',
                                                 'modules/workflow/admin/services-workflowslist.js',
                                                 'modules/workflow/admin/services-createWorkflow.js',
                                                 'modules/workflow/admin/controller-workflowslist.js',
                                                 'modules/workflow/admin/services-createTask.js',
                                                 'modules/workflow/admin/controller-createTask.js'
                                                 
                                             ],{serie: true});
                                           }]
                                          }
                                         }).state("restricted.admin.addworkflowfield", { 
                                          url: "/addworkflowfield",
                                          templateUrl: 'modules/workflow/admin/partials/addFields.html',
                                          controller: 'WorkflowField_Ctrl',
                                          resolve: {
                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                                     
                                                 'modules/user/services-login.js',
                                                 'modules/Admin/services-admin.js',
                                                 'modules/Admin/services-master.js',
                                                 'modules/workflow/admin/services-workflowslist.js',
                                                 'modules/workflow/admin/services-createWorkflow.js',
                                                 'modules/workflow/admin/controller-addFields.js',
                                                 'modules/workflow/admin/controller-workflowslist.js',
                                                 'modules/workflow/admin/controller-createWorkflow.js'
                                                 
                                             ],{serie: true});
                                           }]
                                          }
                                         }).state("restricted.admin.taskslist", { 
                                              url: "/taskslist",
                                              templateUrl: 'modules/workflow/admin/partials/tasksList.html',
                                              controller: 'TasksList_Ctrl',
                                              resolve: {
                                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                                         
                                                     'modules/user/services-login.js',
                                                     'modules/Admin/services-admin.js',
                                                     'modules/workflow/admin/services-workflowslist.js',
                                                     'modules/workflow/admin/services-createWorkflow.js',
                                                     'modules/workflow/admin/controller-workflowslist.js',
                                                     'modules/workflow/admin/services-tasksList.js',
                                                     'modules/workflow/admin/controller-tasksList.js'
                                                     
                                                 ],{serie: true});
                                               }]
                                              }
                                             }).state("restricted.admin.ownerworkflow", {  // sintu
                                                                                           // ..
                                          url: "/ownerworkflowlist",
                                          templateUrl: 'modules/workflow/owner/ownerWorkflowList.html',
                                          controller: 'Workflow_Owner_Ctrl',
                                          resolve: {
                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                         
                                     'modules/user/services-login.js',
                                     'modules/Admin/services-admin.js',
                                     'modules/profile/services-profile.js',
                                     'modules/workflow/owner/controller-workflow-owner.js',
                                     'modules/workflow/owner/services-workflow-owner.js'
                                 ],{serie: true});
                               }]
                              }
                                             }).state("restricted.admin.WfTicketStatusCount", { 
                                                  url: "/WfTicketStatusCount",
                                                  templateUrl: 'modules/workflow/owner/WfTicketStatusCount.html',
                                                  controller: 'Wf_ticketStatusCount_Ctrl',
                                                  resolve: {
                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                    return $ocLazyLoad.load([
                                                                 
                                             'modules/user/services-login.js',
                                             'modules/Admin/services-admin.js',
                                             'modules/profile/services-profile.js',
                                             'modules/workflow/owner/controller-wfTicketStatusCount.js',
                                             'modules/workflow/owner/services-wfTicketStatusCount.js'
                                         ],{serie: true});
                                       }]
                                      }
                             }).state("restricted.admin.WfTicketsTasksStatusCount", { 
                                  url: "/WfTicketsTaskStatusCount",
                                  templateUrl: 'modules/workflow/owner/partials/ticketstaskgraph.html',
                                  controller: 'Wf_tickettasksStatusCount_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                                 
                             'modules/user/services-login.js',
                             'modules/Admin/services-admin.js',
                             'modules/profile/services-profile.js',
                             'modules/workflow/owner/controller-ticketstaskgraph.js',
                             'modules/workflow/owner/service-ticketstaskgraph.js',
                             'modules/workflow/owner/controller-wfTicketStatusCount.js',
                             'modules/workflow/owner/services-wfTicketStatusCount.js'
                         ],{serie: true});
                       }]
                      }
             }).state("restricted.admin.mytask", {  // sintu ..
                                  url: "/mytask",
                                  templateUrl: 'modules/workflow/owner/myTask.html',
                                  controller: 'mytask_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                                             
                                         'modules/user/services-login.js',
                                         'modules/Admin/services-admin.js',
                                         'modules/profile/services-profile.js',
                                         'modules/workflow/owner/services-mytask.js',
                                         'modules/workflow/owner/controller-mytask.js'
                                     ],{serie: true});
                                   }]
                                  }
                                 }).state("restricted.admin.ticket", {  // sintu
                                                                           // ..
                                      url: "/ticketList",
                                      templateUrl: 'modules/workflow/owner/ticketList.html',
                                      controller: 'ticket_Ctrl',
                                      resolve: {
                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                                                 
                                             'modules/user/services-login.js',
                                             'modules/Admin/services-admin.js',
                                             'modules/profile/services-profile.js',
                                             'modules/Admin/services-survey_assignment.js',
                                             'modules/workflow/admin/services-createWorkflow.js',
                                             'modules/workflow/owner/services-ticket.js',
                                             'modules/workflow/owner/controller-ticket.js'
                                         ],{serie: true});
                                       }]
                                      }
                                     }).state("restricted.admin.ticketdetails", {
                                          url: "/ticketdetails",
                                          templateUrl: 'modules/workflow/owner/partials/ticketDetails.html',
                                          controller: 'TicketDetails_Ctrl',
                                          resolve: {
                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                                     
                                                 'modules/user/services-login.js',
                                                 'modules/Admin/services-admin.js',
                                                 'modules/Admin/services-survey_assignment.js',
                                                 'modules/workflow/owner/services-addTicket.js',
                                                 'modules/workflow/admin/services-createWorkflow.js',
                                                 'modules/workflow/owner/services-ticket.js',
                                                 'modules/workflow/owner/services-ticketDetails.js',
                                                 'modules/workflow/owner/controller-ticketDetails.js'
                                                 
                                             ],{serie: true});
                                           }]
                                          }
                                         }).state("restricted.admin.addTicket", {  // sintu
                                                                                   // ..
                                          url: "/addNewTicket",
                                          templateUrl: 'modules/workflow/owner/addTicket.html',
                                          controller: 'addTicket_Ctrl',
                                          resolve: {
                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                                     
                                                 'modules/user/services-login.js',
                                                 'modules/Admin/services-admin.js',
                                                 'modules/profile/services-profile.js',
                                                 'modules/Admin/services-survey_assignment.js',
                                                 'modules/workflow/owner/services-addTicket.js',
                                                'modules/workflow/owner/controller-addTicket.js'
                                             ],{serie: true});
                                           }]
                                          }
                                         }).state("restricted.admin.ownertasklist",{ 
                                              url: "/ownertasklist",
                                              templateUrl: 'modules/workflow/owner/ownerTaskList.html',
                                              controller: 'owner_TaskList_Ctrl',
                                              resolve: {
                                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                                         
                                                     'modules/user/services-login.js',
                                                     'modules/Admin/services-admin.js',
                                                     // 'modules/Admin/services-admin.js',
                                                     'modules/Admin/services-survey_assignment.js',
                                                     'modules/workflow/admin/services-createWorkflow.js',
                                                     'modules/profile/services-profile.js',
                                                     'modules/workflow/owner/services-ticket.js',
                                                     'modules/workflow/admin/services-tasksList.js',
                                                     'modules/workflow/owner/controller-ownerTaskList.js'
                                                     
                                                 ],{serie: true});
                                               }]
                                              }
                                             }).state("restricted.uploadticketdata", {
                                                  url: "/uploadticketdata",
                                                  templateUrl: 'modules/workflow/owner/partials/uploadTicketData.html',
                                                  controller: 'UploadTicketData_Ctrl',
                                                  resolve: {
                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                    return $ocLazyLoad.load([
                                                                             
                                                         'modules/user/services-login.js',
                                                         'modules/workflow/owner/services-uploadTicketData.js',
                                                        'modules/workflow/owner/controller-uploadTicketData.js'
                                                         
                                                     ],{serie: true});
                                                   }]
                                                  }
                                                 }).state("restricted.admin.tasksetting", {
                                                      url: "/tasksetting",
                                                      templateUrl: 'modules/workflow/admin/partials/taskSetting.html',
                                                      controller: 'TaskSetting_Ctrl',
                                                      resolve: {
                                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                        return $ocLazyLoad.load([
                                                                                 
                                                             'modules/user/services-login.js',
                                                             'modules/Admin/services-admin.js',
                                                             'modules/workflow/admin/services-tasksList.js',
                                                             'modules/workflow/admin/controller-tasksList.js',
                                                             'modules/workflow/admin/services-createTask.js',
                                                             'modules/workflow/admin/controller-createTask.js',
                                                             'modules/workflow/admin/controller-taskSetting.js'
                                                         ],{serie: true});
                                                       }]
                                                      }
                                                     }).state("restricted.admin.expensesummeryreport", {
                                                          url: "/expensesummeryreport",
                                                          templateUrl: 'modules/Admin/partials/Expense_Summary_report.html',
                                                          controller: 'adminSummaryreport_Ctrl',
                                                          resolve: {
                                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                            return $ocLazyLoad.load([
                                                                                     
                                                                 'modules/user/services-login.js',
                                                                 'modules/Admin/services-admin.js',
                                                                 'modules/Admin/services-e_expenses.js',
                                                                 'modules/profile/services-e_profile.js',
                                                                 'modules/Admin/controller-expenseDetails.js',
                                                                 'modules/Admin/controller-expenseSummaryReport.js',
                                                                                                                           
                                                             ],{serie: true});
                                                           }]
                                                          }
                                                         }).state("restricted.admin.role_listing", {
                                                              url: "/role_listing",
                                                              templateUrl: 'modules/Admin/partials/role_listing.html',
                                                              controller: 'role_mapping_Ctrl',
                                                              resolve: {
                                                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                return $ocLazyLoad.load([
                                                                                         
                                                                     'modules/user/services-login.js',
                                                                     'modules/Admin/services-admin.js',
                                                                     
                                                                     'modules/Admin/services-role_mapping.js',
                                                                     'modules/Admin/controller-role_mapping.js',
                                                                     'modules/Admin/controller-create_role.js',
                                                                                                                               
                                                                 ],{serie: true});
                                                               }]
                                                              }
                                                            
                                                             }).state("restricted.admin.create_role", {
                                                                  url: "/role_listing",
                                                                  templateUrl: 'modules/Admin/partials/create_role.html',
                                                                  controller: 'create_role_Ctrl',
                                                                  resolve: {
                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                    return $ocLazyLoad.load([
                                                                                             
                                                                         'modules/user/services-login.js',
                                                                         'modules/Admin/services-admin.js',
                                                                         
                                                                         'modules/Admin/services-role_mapping.js',
                                                                         'modules/Admin/controller-role_mapping.js',
                                                                         'modules/Admin/controller-create_role.js',
                                                                                                                                   
                                                                     ],{serie: true});
                                                                   }]
                                                                  }
                                                                 }).state("restricted.admin.createGroup", {
                                                                      url: "/createGroup",
                                                                      templateUrl: 'modules/workflow/admin/partials/createGroup.html',
                                                                      controller: 'create_group_Ctrl',
                                                                      resolve: {
                                                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                        return $ocLazyLoad.load([
                                                                                                 
                                                                             'modules/user/services-login.js',
                                                                             'modules/Admin/services-admin.js',
                                                                             'modules/Admin/services-survey_assignment.js',
                                                                             'modules/workflow/admin/services-wfGroupList.js',
                                                                             'modules/workflow/admin/controller-createGroup.js',
                                                                             
                                                                                                                                       
                                                                         ],{serie: true});
                                                                       }]
                                                                      }
                                                                     }).state("restricted.admin.documents", {
                                                                       url: "/documents",
                                                                       templateUrl: 'modules/documents/documents/partials/document_listing.html',
                                                                       controller: 'DocumentController',
                                                                       resolve: {
                                                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                               return $ocLazyLoad.load([
                                                                                   
                                                                                   'modules/Admin/services-admin.js',
                                                                                   'modules/documents/documents/service_document.js',
                                                                                   'modules/documents/documents/controller_document.js'
   
                                                                                   ],{serie: true});
                                                                           }]
                                                                       }
                                                                   
                                                                   }).state("restricted.admin.document_type", {
                                                                       url: "/document_type",
                                                                       templateUrl: 'modules/documents/document_type/partials/document_TypeListing.html',
                                                                       controller: 'DocumentTpyeListController',
                                                                       resolve: {
                                                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                               return $ocLazyLoad.load([
   
                                                                                   'modules/documents/document_type/service_document_type_list.js',
                                                                                   'modules/documents/document_type/controller_document_type_list.js'
   
                                                                                   ],{serie: true});
                                                                           }]
                                                                       }
                                                                   }).state("restricted.admin.grouplisting", {
                                                                          url: "/grouplisting",
                                                                          templateUrl: 'modules/workflow/admin/partials/group_listing.html',
                                                                          controller: 'group_mapping_Ctrl',
                                                                          resolve: {
                                                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                            return $ocLazyLoad.load([
                                                                                                     
                                                                                 'modules/user/services-login.js',
                                                                                 'modules/Admin/services-admin.js',
                                                                                 
                                                                                 'modules/workflow/admin/controller-wfGroupList.js',
                                                                                 'modules/workflow/admin/services-wfGroupList.js',
                                                                                                                                           
                                                                             ],{serie: true});
                                                                           }]
                                                                          }
                                                                         }).state("restricted.region_selection", {
                                                                               url: "/region",
                                                                               templateUrl: 'modules/internetCalling/user/partials/region_selection.html',
                                                                               controller: 'RegionController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
   
                                                                                           'modules/internetCalling/user/service-region.js',
                                                                                           'modules/internetCalling/user/service-support_options.js',
                                                                                           'modules/internetCalling/user/controller_region.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.call_log", {
                                                                               url: "/call_log",
                                                                               templateUrl: 'modules/internetCalling/calls/partials/call_log.html',
                                                                               controller: 'CallLogController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
   
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/calls/controller_call_log.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.support_options", {
                                                                               url: "/support_options",
                                                                               templateUrl: 'modules/internetCalling/user/partials/support_options.html',
                                                                               controller: 'CallLogController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
   
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/calls/controller_call_log.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.ongoing_call", {
                                                                               url: "/ongoing_call/:callId/:userId/:callType",
                                                                               templateUrl: 'modules/internetCalling/calls/partials/ongoing_call.html',
                                                                               controller: 'OngoingCallLogController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/calls/controller_ongoing_call.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.missed_call_reply", {
                                                                               url: "/missed_call_reply/:callId/:userId/:callType",
                                                                               templateUrl: 'modules/internetCalling/calls/partials/ongoing_call.html',
                                                                               controller: 'MissedCallReplyController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/calls/controller-ongoing-replyCall.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.ongoing_interview", {
                                                                               url: "/ongoing_interview/:callId/:userId/:callType",
                                                                               templateUrl: 'modules/internetCalling/calls/partials/ongoing_call.html',
                                                                               controller: 'OngoingInterviewController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/calls/controller-ongoing-interview.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.createsubsupportgroup", {
                                                                               url: "/create_sub_support_group",
                                                                               templateUrl: 'modules/internetCalling/masters/partials/create_sub_support_group.html',
                                                                               controller: 'CreateSubSupportGroupController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/masters/service_support_group.js',
                                                                                           'modules/internetCalling/masters/service_sub_support_group.js',
                                                                                           'modules/internetCalling/masters/controller_create_sub_support_group.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.editsubsupportgroup", {
                                                                               url: "/edit_sub_support_group/:subSupportGroupId",
                                                                               templateUrl: 'modules/internetCalling/masters/partials/create_sub_support_group.html',
                                                                               controller: 'EditSubSupportGroupController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/masters/service_support_group.js',
                                                                                           'modules/internetCalling/masters/service_sub_support_group.js',
                                                                                           'modules/internetCalling/masters/controller_edit_sub_support_group.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.listsubsupportgroup", {
                                                                               url: "/list_sub_support_group",
                                                                               templateUrl: 'modules/internetCalling/masters/partials/sub_supportGroup_listing.html',
                                                                               controller: 'ListingSubSupportGroupController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/Admin/services-admin.js',
                                                                                           'modules/internetCalling/masters/service_sub_support_group.js',
                                                                                           'modules/internetCalling/masters/service_support_group.js',
                                                                                           'modules/internetCalling/masters/controller_listing_sub_support_group.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.supportgrouplist", {
                                                                               url: "/supportgrouplist",
                                                                               templateUrl: 'modules/internetCalling/masters/partials/supportGroup_listing.html',
                                                                               controller: 'ListingSupportGroupController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           
                                                                                            'modules/internetCalling/user/service-region.js',
                                                                                           'modules/internetCalling/masters/service_support_group.js',
                                                                                           'modules/internetCalling/masters/controller_listing_support_group.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.support_feedback", {
                                                                               url: "/support_feedback/:callId",
                                                                               templateUrl: 'modules/internetCalling/user/partials/support_feedback.html',
                                                                               controller: 'SupportFeedbackController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/user/service-ticket.js',
                                                                                           'modules/Admin/services-admin.js',
                                                                                           'modules/internetCalling/user/controller_support_feedback.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.ticket_submitted", {
                                                                               url: "/ticket_submitted",
                                                                               templateUrl: 'modules/internetCalling/user/partials/ticket_submitted.html',
                                                                               controller: 'SupportFeedbackController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/user/service-ticket.js',
                                                                                           'modules/Admin/services-admin.js',
                                                                                           'modules/internetCalling/user/controller_support_feedback.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.call", {
                                                                               url: "/call/:callId/:callType",
                                                                               templateUrl: 'modules/internetCalling/user/partials/call.html',
                                                                               controller: 'CallController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/user/service-ticket.js',
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/user/controller_call.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.call_reply", {
                                                                               url: "/call_reply/:callId/:callType",
                                                                               templateUrl: 'modules/internetCalling/user/partials/call.html',
                                                                               controller: 'CallReplyController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/user/service-ticket.js',
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/internetCalling/user/controller_callreply.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.callforinterview", {
                                                                               url: "/callforinterview/:callId/:callType",
                                                                               templateUrl: 'modules/internetCalling/user/partials/interview_call.html',
                                                                               controller: 'CallForInterviewCntrl',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/calls/service-call_log.js',
                                                                                           'modules/job_fair/user/controller-call_for_interview.js'
   
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
                                                                           }).state("restricted.admin.createsupportgroup", {
                                                                               url: "/createsupportGroup",
                                                                               templateUrl: 'modules/internetCalling/masters/partials/create_support_group.html',
                                                                               controller: 'CreateSupportGroupController',
                                                                               resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                       return $ocLazyLoad.load([
                                                                                           'modules/internetCalling/user/service-region.js',
                                                                                           'modules/internetCalling/masters/service_support_group.js',
                                                                                           'modules/internetCalling/masters/controller_create_support_group.js',
                                                                                           
                                                                                           ],{serie: true});
                                                                                   }]
                                                                               }
           }).state("restricted.supporttickets", {
               url: "/supporttickets",
               templateUrl: 'modules/internetCalling/user/partials/tickets.html',
               controller: 'TicketsController',
               resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                   return $ocLazyLoad.load([
                       'modules/internetCalling/user/service-ticket.js',
                       'modules/internetCalling/user/controller-ticket.js',
                       ],{serie: true});
                   }]
               }
       }).state("restricted.admin.jobfairslist", { 
              url: "/jobfairslist",
              templateUrl: 'modules/job_fair/admin/partials/job_fairs_list.html',
              controller: 'JobFairsList_Ctrl',
              resolve: {
               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                       'modules/Admin/controller-createEventscheduler.js',
                     
                    'modules/job_fair/admin/services-job_fairs_list.js',
                    'modules/job_fair/admin/controller-job_fairs_list.js'
                     
                 ],{serie: true});
               }]
              }
           }).state("restricted.admin.createjobfair", { 
                  url: "/createjobfair",
                  templateUrl: 'modules/job_fair/admin/partials/create_job_fair.html',
                  controller: 'CreateJobFair_Ctrl',
                  resolve: {
                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                         
                        'modules/job_fair/admin/services-job_fairs_list.js',
                        'modules/job_fair/admin/controller-job_fairs_list.js',
                        'modules/job_fair/admin/services-create_job_fair.js',
                         'modules/Admin/services-JobFairJobMapping.js',
                        'modules/job_fair/admin/controller-create_job_fair.js'
                         
                     ],{serie: true});
                   }]
                  }
           
               }).state("restricted.admin.Job_Map_listing", {
                      url: "/Job_Map_listing",
                      templateUrl: 'modules/Admin/partials/Job_fair_map_list.html',
                      controller: 'Job_fair_map_Ctrl',
                      resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                                 
                             'modules/user/services-login.js',
                             'modules/Admin/services-admin.js',
                             
                             'modules/Admin/services-JobFairJobMapping.js',
                             'modules/Admin/controller-JobFairJobMapping.js',
                           
                                                                                       
                         ],{serie: true});
                       }]
                      }
                      }).state("restricted.initiate_interview", {
                          url: "/initiate_interview",
                          templateUrl: 'modules/job_fair/user/partials/initiate_intereview.html',
                          controller: 'InitiateInterviewController',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                                     
                                 'modules/internetCalling/user/service-region.js',
                                 'modules/internetCalling/calls/service-call_log.js',
                                 'modules/internetCalling/user/service-support_options.js',
                                 'modules/job_fair/user/controller-initiate_interview.js',
                                 'modules/job_fair/user/services-user_job_fair.js'
                                                                                           
                             ],{serie: true});
                           }]
                          }
                      }).state("user_job_fair", {
                          url: "/user_job_fair?search",
                          templateUrl: 'modules/job_fair/user/partials/user_job_fair.html',
                          controller: 'UserJobFair_Ctrl',
                          resolve: {
                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                 'modules/user/services-login.js',
                                 'modules/Admin/services-admin.js',                   
                                 'modules/job_fair/user/services-user_job_fair.js',
                                 'modules/job_fair/user/controller-user_job_fair.js',
                                 'modules/job_fair/admin/services-job_fairs_list.js',
                                 'modules/job_fair/user/controller-initiate_interview.js',
                                
                                                                                           
                             ],{serie: true});
                           }]
                          }
                          
                          }).state("restricted.user_job_fair", {
                              url: "/user_job_fair",
                              templateUrl: 'modules/job_fair/user/partials/user_job_fair.html',
                              controller: 'UserJobFair_Ctrl',
                              resolve: {
                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                     'modules/user/services-login.js',
                                     'modules/Admin/services-admin.js',                   
                                     'modules/job_fair/user/services-user_job_fair.js',
                                     'modules/job_fair/user/controller-user_job_fair.js',
                                     'modules/job_fair/user/controller-initiate_interview.js',
                                     'modules/job_fair/admin/services-job_fairs_list.js',
                                                                                               
                                 ],{serie: true});
                               }]
                              }
                              }).state("restricted.user_walkin", {
                                  url: "/user_walkin",
                                  templateUrl: 'modules/job_fair/user/partials/user_walkin.html',
                                  controller: 'UserWalkin_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                         'modules/user/services-login.js',
                                         'modules/Admin/services-admin.js',   
                                         'modules/job_fair/user/controller-user_walkin.js',
                                         'modules/job_fair/user/service-user_walkin.js',
                                         'modules/job_fair/user/controller-initiate_interview.js',
                                         'modules/job_fair/admin/services-job_fairs_list.js'
                                                                                                   
                                     ],{serie: true});
                                   }]
                                  }
                                  }).state("restricted.user_career_fair", {
                                  url: "/user_career_fair",
                                  templateUrl: 'modules/job_fair/user/partials/user_career_fair.html',
                                  controller: 'UserCareerFair_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                         'modules/user/services-login.js',
                                         'modules/Admin/services-admin.js',                   
                                         'modules/job_fair/user/services-user_career_fair.js',
                                         'modules/job_fair/user/controller-user_career_fair.js'
                                                                                                   
                                     ],{serie: true});
                                   }]
                                  }
                              }).state("user_job_fair_job_desc", {
                                  url: "/user_job_fair_desc?search",
                                  templateUrl: 'modules/job_fair/user/partials/user_job_fair_job_desc.html',
                                  controller: 'UserJobFairJobDesc_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                         'modules/user/services-login.js',
                                         'modules/profile/services-profile.js',
                                         'modules/Admin/services-admin.js', 
                                         'modules/job_fair/user/services-user_job_fair.js',
                                         'modules/job_fair/user/controller-user_job_fair_job_desc.js'
                                                                                                   
                                     ],{serie: true});
                                   }]
                                  }
                                  }).state("restricted.user_job_fair_job_desc", {
                                  url: "/user_job_fair_desc",
                                  templateUrl: 'modules/job_fair/user/partials/user_job_fair_job_desc.html',
                                  controller: 'UserJobFairJobDesc_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                         'modules/user/services-login.js',
                                         'modules/profile/services-profile.js',
                                         'modules/Admin/services-admin.js', 
                                         'modules/job_fair/user/services-user_job_fair.js',
                                         'modules/job_fair/user/controller-user_job_fair_job_desc.js'
                                                                                                   
                                     ],{serie: true});
                                   }]
                                  }
                              }).state("restricted.user_job_fair_your_slot", {
                                      url: "/user_job_fair_your_slot",
                                      templateUrl: 'modules/job_fair/user/partials/user_job_fair_your_slot.html',
                                      controller: 'UserJobFairYourSlot_Ctrl',
                                      resolve: {
                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                             'modules/user/services-login.js',
                                             'modules/Admin/services-admin.js',                   
                                             'modules/job_fair/user/services-user_job_fair.js',
                                             'modules/job_fair/user/controller-user_job_fair.js'
                                                                                                       
                                         ],{serie: true});
                                       }]
                                      }
                                  }).state("restricted.admin.interviewer_screen", {
                              url: "/interviewer_screen",
                              templateUrl: 'modules/job_fair/admin/partials/interviewer_screen.html',
                              controller: 'ControllerInterviewerScreen',
                              resolve: {
                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                                         
                                     'modules/internetCalling/user/service-region.js',
                                     'modules/internetCalling/calls/service-call_log.js',
                                     'modules/internetCalling/user/service-support_options.js',
                                     'modules/job_fair/admin/controller-interviewer_screen.js',
                                     'modules/job_fair/admin/services-interviewer_screen.js',
                                     'modules/internetCalling/calls/services-interview_request.js',
                                                                                               
                                 ],{serie: true});
                               }]
                              }
                              }).state("restricted.admin.consulateverification", { 
                                  url: "/consulateverification",
                                  templateUrl: 'modules/consulate/partials/consulate_varification.html',
                                  controller: 'consulate_verfication_Ctrl',
                                  resolve: {
                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([						                           
                                         'modules/consulate/services-consulate_verfication.js',
                                         'modules/consulate/controller-consulate_verification.js'
                                     ],{serie: true});
                                   }]
                                  }
                                 }).state("restricted.admin.interviewassessmentmaster", { 
                                      url: "/interviewassessmentmaster",
                                      templateUrl: 'modules/Admin/partials/InterviewAssessmentMaster.html',
                                      controller: 'interviewAssessmentmaster_Ctrl',
                                      resolve: {
                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                             'modules/Admin/services-master.js',
                                             'modules/Admin/services-interview_assessment_master.js',
                                             'modules/Admin/controller-interviewAssessmentMaster.js',
                                             'modules/Admin/services-admin.js'
                                         ],{serie: true});
                                       }]
                                      }
                                     }).state("restricted.admin.bulksms", {
                                          url: "/bulksms",
                                          templateUrl: 'modules/Admin/partials/bulksms.html',
                                          controller: 'Bulk_Sms_Ctrl',
                                          resolve: {
                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                'modules/user/services-login.js',
                                                 'modules/Admin/services-bulksms.js',
                                                 'modules/Admin/controller-bulksms.js'
                                             /*'modules/user/services-login.js',
                                             'modules/Admin/services-bulksms.js',
                                             'modules/Admin/controller-bulksms.js'*/
                                            ],{serie: true});
                                           }]
                                          }
                                         }).state("restricted.admin.passportupload", {
                                              url: "/passportupload",
                                              templateUrl: 'modules/Admin/partials/passportupload.html',
                                              controller: 'Passport_Upload_Ctrl',
                                              resolve: {
                                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                return $ocLazyLoad.load([                            
                                                      'modules/user/services-login.js',                     
                                                      'modules/Admin/controller-passportupload.js',      
                                                      'modules/Admin/service-passportupload.js',
                                                      'modules/Admin/services-master.js',
                                                      'modules/profile/services-profile.js',
                                                 ],{serie: true});
                                               }]
                                              }
                                             }).state("restricted.myinterview", {
                                                  url: "/my_interview",
                                                  templateUrl: 'modules/profile/partials/my_interview.html',
                                                  controller: 'My_Interview_Ctrl',
                                                  resolve: {
                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                    return $ocLazyLoad.load([
                                                        'modules/internetCalling/calls/service-call_log.js',
                                                         'modules/internetCalling/user/service-support_options.js',
                                                        'modules/user/services-login.js',
                                                        'modules/profile/services-profile.js',
                                                        'modules/profile/controller-my_interviews.js',
                                                        'modules/profile/services-my_interviews.js'
                                                     ],{serie: true});
                                                   }]
                                                  }
                                                 }).state("restricted.interview_initiate", {
                                                      url: "/interview_initiate",
                                                      templateUrl: 'modules/profile/partials/interview_initiate.html',
                                                      controller: 'Interview_Initiate_Ctrl',
                                                      resolve: {
                                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                        return $ocLazyLoad.load([
                                                            'modules/internetCalling/calls/service-call_log.js',
                                                             'modules/internetCalling/user/service-support_options.js',
                                                            'modules/user/services-login.js',
                                                            'modules/profile/services-profile.js',
                                                            'modules/profile/controller-interview_initiate.js'
                                           
                                                         ],{serie: true});
                                                       }]
                                                      }
                                                     }).state("restricted.admin.crewdeploymentconfiguration", {
                                                          url: "/crewdeploymentconfiguration",
                                                          templateUrl: 'modules/CrewDeployment/Admin/partials/crewdeploymentconfiguration.html',
                                                          controller: 'CrewDeploymentConfiguration_Ctrl',
                                                          resolve: {
                                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                            return $ocLazyLoad.load([
                                                             'modules/user/services-login.js',
                                                             'modules/CrewDeployment/Admin/services-crewdeployrequisitionMaster.js',
                                                             'modules/CrewDeployment/Admin/controller-crewdeploymentconfiguration.js'
                                                             ],{serie: true});
                                                           }]
                                                          }
                                                         }).state("restricted.admin.uploadcrewdeployleavedata", {
                                                              url: "/uploadcrewdeployleavedata",
                                                              templateUrl: 'modules/CrewDeployment/Admin/partials/uploadcrewdeployleavedata.html',
                                                              controller: 'CrewDeploymentLeaveDataUpload_Ctrl',
                                                              resolve: {
                                                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                return $ocLazyLoad.load([
                                                                 'modules/user/services-login.js',
                                                                 'modules/CrewDeployment/Admin/services-crewdeploymentleavedataupload.js',
                                                                 'modules/CrewDeployment/Admin/controller-crewdeploymentleavedataupload.js'
                                                                 ],{serie: true});
                                                               }]
                                                              }
                                                             }).state("restricted.admin.createcrewdeployrequisition", {
                                                                  url: "/createcrewdeployrequisition",
                                                                  templateUrl: 'modules/CrewDeployment/Admin/partials/createcrewdeployrequisition.html',
                                                                  controller: 'CreateCrewDeploymentRequisition_Ctrl',
                                                                  resolve: {
                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                    return $ocLazyLoad.load([
                                                                     'modules/user/services-login.js',
                                                                     'modules/CrewDeployment/Admin/services-crewdeployrequisitionMaster.js',
                                                                     'modules/CrewDeployment/Admin/services-crewdeployCreateViewRequisition.js',
                                                                     'modules/CrewDeployment/Admin/controller-createcrewdeploymentrequisition.js'
                                                                     ],{serie: true});
                                                                   }]
                                                                  }
                                                                 }).state("restricted.admin.crewdeploymentrequisitionlist", {
                                                                      url: "/CrewDeploymentRequisitionList",
                                                                      templateUrl: 'modules/CrewDeployment/Admin/partials/crewdeploymentrequisitionlist.html',
                                                                      controller: 'CrewDeploymentRequisitionList_Ctrl',
                                                                      resolve: {
                                                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                        return $ocLazyLoad.load([
                                                                         'modules/user/services-login.js',
                                                                         'modules/CrewDeployment/Admin/services-crewdeployrequisitionMaster.js',
                                                                         'modules/CrewDeployment/Admin/services-crewdeployCreateViewRequisition.js',
                                                                         'modules/Admin/services-customerrequistion.js',
                                                                         'modules/CrewDeployment/Admin/controller-crewdeploymentrequisitionlist.js',
                                                                         'modules/CrewDeployment/Admin/services-crewdeploymentrequisitionApproverList.js'
                                                                         ],{serie: true});
                                                                       }]
                                                                      }
                                                                     }).state("restricted.admin.crewdeploymentrequisitionReport", {
                                                                          url: "/CrewDeploymentRequisitionReport",
                                                                          templateUrl: 'modules/CrewDeployment/Admin/partials/crewdeploymentrequisitionReport.html',
                                                                          controller: 'CrewDeploymentRequisitionReport_Ctrl',
                                                                          resolve: {
                                                                           deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                            return $ocLazyLoad.load([
                                                                             'modules/user/services-login.js',
                                                                             'modules/CrewDeployment/Admin/services-crewdeployrequisitionMaster.js',
                                                                             'modules/CrewDeployment/Admin/controller-crewdeploymentrequisitionReport.js'
                                                                             ],{serie: true});
                                                                           }]
                                                                          }
                                                                         }).state("restricted.admin.crewdeploymentrequisitionReportDetail", {
                                                                              url: "/CrewDeploymentRequisitionReportDetail",
                                                                              templateUrl: 'modules/CrewDeployment/Admin/partials/crewdeploymentrequisitionReportDetail.html',
                                                                              controller: 'CrewDeploymentRequisitionReportDetail_Ctrl',
                                                                              resolve: {
                                                                               deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                return $ocLazyLoad.load([
                                                                                 'modules/user/services-login.js',
                                                                                 'modules/CrewDeployment/Admin/services-crewdeployrequisitionMaster.js',
                                                                                 'modules/CrewDeployment/Admin/controller-crewdeploymentrequisitionReportDetail.js'
                                                                                 ],{serie: true});
                                                                               }]
                                                                              }
                                                                             }).state("restricted.admin.crewdeployApproverList", {
                                                                                  url: "/CrewDeploymentRequisitionApproverList",
                                                                                  templateUrl: 'modules/CrewDeployment/Admin/partials/crewdeploymentrequisitionApproverList.html',
                                                                                  controller: 'CrewDeploymentRequisitionApproverList_Ctrl',
                                                                                  resolve: {
                                                                                   deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                    return $ocLazyLoad.load([
                                                                                     'modules/user/services-login.js',
                                                                                     'modules/CrewDeployment/Admin/services-crewdeploymentrequisitionApproverList.js',
                                                                                     'modules/CrewDeployment/Admin/controller-crewdeploymentrequisitionApproverList.js'
                                                                                     ],{serie: true});
                                                                                   }]
                                                                                  }
                                                                                 }).state("restricted.EIForm", {
                                                                                      url: "/EIForm",
                                                                                      templateUrl: 'modules/dashboard/partials/EIForm.html',
                                                                                      controller: 'EIForm_Ctrl',
                                                                                      resolve: {
                                                                                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                                                                        return $ocLazyLoad.load([
                                                                                         'modules/user/services-login.js',
                                                                                         'modules/dashboard/services-EIForm.js',
                                                                                         'modules/dashboard/controller-EIForm.js'
                                                                                            
                                                                                         ],{serie: true});
                                                                                       }]
                                                                                      }
                                                                                     });
               }]);
   
   
   CruiseWebsite.run(function ($rootScope,$transitions, $location,$state,GlobalModule_dataStoreService) {
   
    $transitions.onEnter({entering: 'home'}, function(transition, state) {
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
     if(getCookie('ACCESS_TOKEN')){
      if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
       if(($rootScope.userdetails.roleId == 1 || ($rootScope.userdetails.roleId > 3 && $rootScope.userdetails.roleId < 8))){ 
        $state.go("restricted.admin.admindashboard"); 
       }
       else if($rootScope.userdetails.roleId == 8)
       {
           $state.go("restricted.admin.ownerdashboarddetails");
       }
       else if($rootScope.userdetails.roleId == 2 || $rootScope.userdetails.roleId == 3){          
        $state.go("restricted.dashboard"); 
       }
      }
     }
    });
    $transitions.onEnter({ entering: 'restricted.jobdesc'}, function(transition,$stateParams) {
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
     if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
     }else{
      $state.go("jobdesc",{jobId: $stateParams.jobId});  
     }
    });
    
    $transitions.onEnter({ entering: 'restricted.testPlayer' }, function(transition,$stateParams) {  
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
     
     if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
     }else{
      $state.go('restricted.testPlayer');  
     }
    });
    
    $transitions.onEnter({ entering: 'restricted.dashboardDetails' }, function(transition,$stateParams) {  
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');   
     if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
     }else{
      $state.go('restricted.dashboardDetails');  
     }
    });
    
    $transitions.onEnter({ entering: 'restricted.admin.assessmentmaster' }, function(transition,$stateParams) {  
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
     GlobalModule_dataStoreService.storeData('LoginModule','screenId', 4);
     if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
     }else{
      $state.go('restricted.admin.assessmentmaster');  
     }
    });
    
    $transitions.onEnter({ entering: 'restricted.admin.interviewassessmentmaster' }, function(transition,$stateParams) {  
         $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
         GlobalModule_dataStoreService.storeData('LoginModule','screenId', 21);
         if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
         }else{
          $state.go('restricted.admin.interviewassessmentmaster');  
         }
        });
    
    
    $transitions.onEnter({ entering: 'restricted.admin.surveymaster' }, function(transition,$stateParams) {  
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
     GlobalModule_dataStoreService.storeData('LoginModule','screenId', 7);
     if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
     }else{
      $state.go('restricted.admin.surveymaster');  
     }
    });
    
    $transitions.onEnter({ entering: 'restricted.admin.bulksms' }, function(transition,$stateParams) {  
         $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
         GlobalModule_dataStoreService.storeData('LoginModule','screenId', 22);
         if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
         }else{
          $state.go('restricted.admin.bulksms');  
         }
        });
    
    $transitions.onEnter({ entering: 'restricted.**' }, function(transition, state) {
     $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
     if(getCookie('ACCESS_TOKEN')){
      $.ajaxSetup({
          headers: { 'AccessToken':getCookie("ACCESS_TOKEN") }
      });
      if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 
      }else{
       $state.go("login");  
      }
     }else{
      $state.go("login");  
     }
   
    });
   
   });