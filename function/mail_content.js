// //after registration
// const welcomeMessage = ({
// 	recipientName,
// 	workspace,
// 	username,
// }) => `Dear ${recipientName},

// We are excited to welcome you to the MASFoB community! Your account has been created successfully, and we are delighted to have you with us.

// As a valued member, you can explore our platform and make the most of the various features available. Whether you're looking to stay informed, connect with others, or expand your knowledge, we have something for you.

// To get started, please log in to your account using the following details:

// Workspace: ${workspace}
// Username: ${username}

// Take your time to navigate through the site and discover all it has to offer. If you have any questions or need assistance, our support team is here to help. You can reach us at [support@masfob.com].

// Thank you for joining our community. We look forward to your involvement and contributions.`

// module.exports = {
// 	welcomeMessage,
// }
// Define the welcomeMessage function with HTML content
const welcomeMessage = ({ recipientName, workspace, username }) =>
	
	`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Welcome to the MASFoB Community!</title>
  
  <style type="text/css">
    @media only screen and (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    p {
      margin: 0;
    }
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    * {
      line-height: inherit;
    }
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    table, td {
      color: #000000;
    }
  </style>

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                
                <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                    
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                    <!--<![endif]-->
                      
                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                    <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheader.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 100%;max-width: 100px;" width="100"/>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                            <h1>Welcome to the MASFOB Community!</h1>  
                            <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: justify; word-wrap: break-word;">
                               
                              <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                                <p style="line-height: 170%;">We are excited to welcome you to the MASFOB community! Your account has been created successfully, and we are delighted to have you with us.</p>
                                <p style="line-height: 170%;">As a valued member, you can now explore our range of educational resources, connect with fellow professionals, and participate in our exclusive events and webinars.</p>
                                <p style="line-height: 170%;">To get started, please verify your email address by clicking on the link below:</p>
                                <p style="line-height: 170%; text-align: center;">
                                <ul>
                                         <li><strong>Workspace:</strong> ${workspace}</li>
                                         <li><strong>Username:</strong> ${username}</li>
                                     </ul>
                                </p>
                                <p style="line-height: 170%;">If you have any questions or need assistance, feel free to reach out to our support team at [Support Email].</p>
                                <p style="line-height: 170%;">Welcome aboard!</p>
                                <p style="line-height: 170%;">Best regards,</p>
                                <p style="line-height: 170%;"><strong>MASFoB Team</strong></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 60px;font-family:arial,helvetica,sans-serif;" align="left">
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 170%;">© 2024 MASFoB. All rights reserved.</p>
                                
                              
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    <!--[if (!mso)&(!IE)]><!-->
                    </div><!--<![endif]-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->
</body>
</html>`

// Export the welcomeMessage function

const updatePassword = ({ recipientName, workspace, username,password }) =>

`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Welcome to the MASFoB Community!</title>
  
  <style type="text/css">
    @media only screen and (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    p {
      margin: 0;
    }
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    * {
      line-height: inherit;
    }
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    table, td {
      color: #000000;
    }
  </style>

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                
                <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                    
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                    <!--<![endif]-->
                      
                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                   <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheaderooutline.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 50%;max-width: 150px;" width="200"/>

                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                               <h1>Welcome to the MASFOB Community!</h2>
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 130%; text-align: justify; word-wrap: break-word;">
                                <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                               
                                <p style="line-height: 170%;">We are pleased to inform you that your password has been successfully updated. Please use the updated password to log in to your account using the following details:</p>
                                <p style="line-height: 170%; text-align: center;">
<div style="text-align: center; padding: 20px;">
                                <p style="line-height: 170%;">Workspace: ${workspace}</p>
                                <p style="line-height: 170%;">Username: ${username}</p>
                                <p style="line-height: 170%;">Password: ${password}</p></div>
                                </p>
                                <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our agents are here to help. You can reach out to our support team at [Support Email Address].</p>
                               <br /><br />
                                <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 60px;font-family:arial,helvetica,sans-serif;" align="left">
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 170%;">© 2024 MASFoB. All rights reserved.</p>
                                
                              
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    <!--[if (!mso)&(!IE)]><!-->
                    </div><!--<![endif]-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->
</body>
</html>

`
// Agent Added
const addAgent = ({ recipientName, workspace, username }) => 

  `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Welcome to the MASFoB Community!</title>
  
  <style type="text/css">
    @media only screen and (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    p {
      margin: 0;
    }
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    * {
      line-height: inherit;
    }
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    table, td {
      color: #000000;
    }
  </style>

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                
                <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                    
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                    <!--<![endif]-->
                      
                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                   <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheaderooutline.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 50%;max-width: 150px;" width="200"/>

                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                               <h1>Welcome to the MASFOB Community!</h2>
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 130%; text-align: justify; word-wrap: break-word;">
                                <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                               
                                <p style="line-height: 170%;">We are thrilled to inform you that you have been successfully added as an agent to the MASFOB community workspace. We are excited to have you on board and look forward to your contributions:</p>
                                <p style="line-height: 170%; text-align: center;">
<div style="text-align: center; padding: 20px;">
                                <p style="line-height: 170%;">Workspace: ${workspace}</p>
                                <p style="line-height: 170%;">Username: ${username}</p>
                                </div>
                                </p>
                                <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our agents are here to help. You can reach out to our support team at [Support Email Address].</p>
                               <br /><br />
                                <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 60px;font-family:arial,helvetica,sans-serif;" align="left">
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 170%;">© 2024 MASFoB. All rights reserved.</p>
                                
                              
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    <!--[if (!mso)&(!IE)]><!-->
                    </div><!--<![endif]-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->
</body>
</html>

`
//role update
const updateRole = ({recipientName,username ,workspace}) => 
  `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
<title>Welcome to the MASFOB Community!</title>

<style type="text/css">
  @media only screen and (max-width: 520px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: 100% !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  p {
    margin: 0;
  }
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  * {
    line-height: inherit;
  }
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  table, td {
    color: #000000;
  }
</style>

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
        
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              
              <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                  
                  <!--[if (!mso)&(!IE)]><!-->
                  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                  <!--<![endif]-->
                    
                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                 <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheaderooutline.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 50%;max-width: 150px;" width="200"/>

                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <tbody>
                                <tr style="vertical-align: top">
                                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span>&#160;</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                             <h1>Welcome to the MASFOB Community!</h2>
                            <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 130%; text-align: justify; word-wrap: break-word;">
                              <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                             
                              <p style="line-height: 170%;">We are writing to inform you that your agent account associated with the MASFoB community workspace has been successfully deleted</p>
                              <p style="line-height: 170%; text-align: center;">
<div style="text-align: center; padding: 20px;">
                              <p style="line-height: 170%;">Workspace: ${workspace}</p>
                            <p style="line-height: 170%;">username: ${username}</p>
                              </div>
                              </p>
                              <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our agents are here to help. You can reach out to our support team at [Support Email Address].</p>
                             <br /><br />
                              <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <tbody>
                                <tr style="vertical-align: top">
                                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span>&#160;</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 60px;font-family:arial,helvetica,sans-serif;" align="left">
                            <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: center; word-wrap: break-word;">
                              <p style="line-height: 170%;">© 2024 MASFoB. All rights reserved.</p>
                              
                            
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  <!--[if (!mso)&(!IE)]><!-->
                  </div><!--<![endif]-->
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if (mso)|(IE)]></div><![endif]-->
</body>
</html>

`

  // Agent  Delete
  const deleteAgent = ({recipientName,username ,workspace}) => 
    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Welcome to the MASFOB Community!</title>
  
  <style type="text/css">
    @media only screen and (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    p {
      margin: 0;
    }
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    * {
      line-height: inherit;
    }
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    table, td {
      color: #000000;
    }
  </style>

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                
                <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                    
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                    <!--<![endif]-->
                      
                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                   <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheaderooutline.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 50%;max-width: 150px;" width="200"/>

                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                               <h1>Welcome to the MASFOB Community!</h2>
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 130%; text-align: justify; word-wrap: break-word;">
                                <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                               
                                <p style="line-height: 170%;">We are writing to inform you that your agent account associated with the MASFoB community workspace has been successfully deleted</p>
                                <p style="line-height: 170%; text-align: center;">
<div style="text-align: center; padding: 20px;">
                                <p style="line-height: 170%;">Workspace: ${workspace}</p>
                              <p style="line-height: 170%;">username: ${username}</p>
                                </div>
                                </p>
                                <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our agents are here to help. You can reach out to our support team at [Support Email Address].</p>
                               <br /><br />
                                <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 60px;font-family:arial,helvetica,sans-serif;" align="left">
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 170%;">© 2024 MASFoB. All rights reserved.</p>
                                
                              
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    <!--[if (!mso)&(!IE)]><!-->
                    </div><!--<![endif]-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->
</body>
</html>

`

const subscription = ({recipientName,username ,workspace,plan_code,plan_name}) => 
`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Subscription Confirmation</title>
  
  <style type="text/css">
    @media only screen and (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    p {
      margin: 0;
    }
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    * {
      line-height: inherit;
    }
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    table, td {
      color: #000000;
    }
  </style>

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                
                <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                    
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                    <!--<![endif]-->
                      
                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                   <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheaderooutline.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 50%;max-width: 150px;" width="200"/>

                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                               <h1>Subscription Confirmation</h2>
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 130%; text-align: justify; word-wrap: break-word;">
                                <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                               
                                <p style="line-height: 170%;">We are thrilled to inform you that you have successfully subscribed to the MASFOB community. We are excited to have you on board and look forward to providing you with the latest updates and valuable insights:</p>
                                <p style="line-height: 170%; text-align: center;">
<div style="text-align: center; padding: 20px;">
                                <p style="line-height: 170%;">Workspace: ${workspace}</p>
                                <p style="line-height: 170%;">Username: ${username}</p>
                                 <p style="line-height: 170%;">planCode: ${plan_code}</p>
                                <p style="line-height: 170%;">planName: ${plan_name}</p>
                                </div>
                                </p>
                                <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our support team is here to help. You can reach out to our support team at [Support Email Address].</p>
                               <br /><br />
                                <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <
`
const transaction = ({ recipientName, username, workspace, plan_code, status,amount }) => 
  `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title>Subscription Confirmation</title>
    
    <style type="text/css">
      @media only screen and (max-width: 520px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      p {
        margin: 0;
      }
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      * {
        line-height: inherit;
      }
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      table, td {
        color: #000000;
      }
    </style>
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  
                  <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                      
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                      <!--<![endif]-->
                        
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                     <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheaderooutline.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 50%;max-width: 150px;" width="200"/>
  
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                                 <h1>Subscription Confirmation</h1>
                                <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 130%; text-align: justify; word-wrap: break-word;">
                                  <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
                                 
                                  <p style="line-height: 170%;">We are thrilled to inform you that you have successfully subscribed to the MASFOB community. We are excited to have you on board and look forward to providing you with the latest updates and valuable insights:</p>
                                  <div style="text-align: center; padding: 20px;">
                                    <p style="line-height: 170%;">Workspace: ${workspace}</p>
                                    <p style="line-height: 170%;">Username: ${username}</p>
                                    <p style="line-height: 170%;">Plan Code: ${plan_code}</p>
                                    <p style="line-height: 170%;">status: ${status}</p>
                                    <p style="line-height: 170%;">Amount: ${amount}</p>
                                  </div>
                                  <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our support team is here to help. You can reach out to our support team at [Support Email Address].</p>
                                  <br /><br />
                                  <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>`



   //
////  testing lable assign email

const lableAssign = ({ recipientName, workspace, username }) =>
	
//   `<!DOCTYPE html>
//   <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//   <head>
//     <!--[if gte mso 9]>
//     <xml>
//       <o:OfficeDocumentSettings>
//         <o:AllowPNG/>
//         <o:PixelsPerInch>96</o:PixelsPerInch>
//       </o:OfficeDocumentSettings>
//     </xml>
//     <![endif]-->
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="x-apple-disable-message-reformatting">
//     <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
//     <title>Welcome to the MASFoB Community!</title>
    
//     <style type="text/css">
//       @media only screen and (max-width: 520px) {
//         .u-row-container {
//           max-width: 100% !important;
//           padding-left: 0px !important;
//           padding-right: 0px !important;
//         }
//         .u-row .u-col {
//           min-width: 320px !important;
//           max-width: 100% !important;
//           display: block !important;
//         }
//         .u-row {
//           width: 100% !important;
//         }
//         .u-col {
//           width: 100% !important;
//         }
//         .u-col > div {
//           margin: 0 auto;
//         }
//       }
//       body {
//         margin: 0;
//         padding: 0;
//       }
//       table,
//       tr,
//       td {
//         vertical-align: top;
//         border-collapse: collapse;
//       }
//       p {
//         margin: 0;
//       }
//       .ie-container table,
//       .mso-container table {
//         table-layout: fixed;
//       }
//       * {
//         line-height: inherit;
//       }
//       a[x-apple-data-detectors='true'] {
//         color: inherit !important;
//         text-decoration: none !important;
//       }
//       table, td {
//         color: #000000;
//       }
//     </style>
  
//   </head>
  
//   <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
//     <!--[if IE]><div class="ie-container"><![endif]-->
//     <!--[if mso]><div class="mso-container"><![endif]-->
//     <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
//       <tbody>
//         <tr style="vertical-align: top">
//           <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//             <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
            
//             <div class="u-row-container" style="padding: 0px;background-color: transparent">
//               <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//                 <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  
//                   <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
//                     <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                      
//                       <!--[if (!mso)&(!IE)]><!-->
//                       <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
//                       <!--<![endif]-->
                        
//                         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//                           <tbody>
//                             <tr>
//                               <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
//                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                                   <tr>
//                                     <td style="padding-right: 0px;padding-left: 0px;" align="left">
//                                       <img align="left" border="0" src="https://mindvision.sgp1.cdn.digitaloceanspaces.com/assets/emailheader.png" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 100%;max-width: 100px;" width="100"/>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
  
//                         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//                           <tbody>
//                             <tr>
//                               <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
//                                 <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
//                                   <tbody>
//                                     <tr style="vertical-align: top">
//                                       <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
//                                         <span>&#160;</span>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
  
//                         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//                           <tbody>
//                             <tr>
//                               <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
//                               <h1>Welcome to the MASFoB Community!</h1>  
//                               <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: justify; word-wrap: break-word;">
                                 
//                                 <p style="line-height: 170%;">Dear ${recipientName},<br /><br /></p>
//                                   <p style="line-height: 170%;">We are excited to welcome you to the MASFoB community! Your account has been created successfully, and we are delighted to have you with us.</p>
//                                   <p style="line-height: 170%;">As a valued member, you can now explore our range of educational resources, connect with fellow professionals, and participate in our exclusive events and webinars.</p>
//                                   <p style="line-height: 170%;">Don't forget to visit our website for a variety of apps and exciting discounts available just for you!</p>
//                                   <p style="line-height: 170%;">To get started, please verify your email address by clicking on the link below:</p>
//                                   <p style="line-height: 170%; text-align: center;">
//                                   <ul>
//                                            <li><strong>Workspace:</strong> ${workspace}</li>
//                                            <li><strong>Username:</strong> ${username}</li>
//                                        </ul>
//                                   </p>
//                                   <p style="line-height: 170%;">If you have any questions or need assistance, feel free to reach out to our support team at [Support Email].</p>
//                                   <p style="line-height: 170%;">Welcome aboard!</p>
//                                   <p style="line-height: 170%;">Best regards,</p>
//                                   <p style="line-height: 170%;"><strong>MAS
  
// </div>
// <p style="line-height: 170%;">Feel free to explore and familiarize yourself with our platform. If you have any questions or need assistance, our support team is here to help. You can reach out to our support team at [Support Email Address].</p>
// <br /><br />
// <p style="line-height: 170%;"><strong>Thank you for joining our community. We look forward to your active participation and contributions.</strong></p>
// </div>
// </td>
// </tr>
// </tbody>
// </table>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
// </td>
// </tr>
// </tbody>
// </table>
// </body>
// </html>`
  `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title>Welcome to the MASFoB Community!</title>
    <style type="text/css">
      @media only screen and (max-width: 520px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      p {
        margin: 0;
      }
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      * {
        line-height: inherit;
      }
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      table, td {
        color: #000000;
      }
    </style>
  </head>
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <div class="u-col u-col-100" style="max-width: 500px;min-width: 320px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                      <!--<![endif]-->
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="left">
                                      <img align="left" border="0" src="https://sample.com" alt="MASFoB Logo" title="MASFoB Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: left;width: 100%;max-width: 100px;" width="100"/>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 31px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                              <h1>Thank you for purchasing magic card(s).</h1>
                              <div style="font-family: inherit; font-size: 14px; color: #000000; line-height: 170%; text-align: justify; word-wrap: break-word;">
                                  <p style="line-height: 170%;">We just need a little more information to prepare your cards. Could you please fill out the Google form by clicking the below link:</p>
                                  <p style="line-height: 170%;"><a href="https://wa.me/919789935252?text=Please+let+me+know+the+next+step+to+prepare+my+card(s)">https://forms.gle/LMfvZZJizJwNVW1aA</a></p>
                                  <br></br>
                                  <p style="line-height: 170%;">You can also reach out to us through our whatsapp Support <a href="https://forms.gle/LMfvZZJizJwNVW1aA">click here</a> </p>
                                  <p style="line-height: 170%;"></p></p>
</div>
<br></br>
<p style="line-height: 170%;"><strong>Thanks,
</strong></p>
<p style="line-height: 170%;"><strong>
Masfob Team</strong></p>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</body>
</html>`
module.exports = {
	welcomeMessage,updatePassword,addAgent,deleteAgent,updateRole,subscription,transaction,lableAssign
}
