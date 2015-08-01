var React           = require('react');
var assign          = require('object-assign');

var AboutPage = React.createClass({

  render: function() {
    return (
      <div>
        <div className="row">
              <div className="col-md-3" id="leftCol">
                      
              <div className="well"> 
                      <ul className="nav nav-stacked" id="sidebar">
                        <li><a href="#sec1">Section 1</a></li>
                        <li><a href="#sec2">Section 2</a></li>
                        <li><a href="#sec3">Section 3</a></li>
                        <li><a href="#sec4">Section 4</a></li>
                      </ul>
                </div>

                </div>  
                <div className="col-md-9">


                      <h2 id="sec0">Getting Started</h2>

                      <p>Inject the Portalize script by inserting the following line of code into your HTML file:</p>
                      <pre><code className='hljs html'>
                        &lt;script src="http://www.portalize.io/library"&gt;&lt;/script&gt;
                      </code></pre>
                      <p>
                        Additionally, add the Portalize CSS link to your HTML file to import the Portalize default styles.  
                        Place this link <b>before</b> all other CSS links in your HTML file if you plan on overriding the default CSS styles.
                      </p>
                      <pre><code className='hljs html'>
                        &lt;link href="https://portalize.io/librarystyles" rel="stylesheet"&gt;
                      </code></pre>
                      


                      <h2 id="sec1">Choosing a Customer Interface Style</h2>
                      <p>
                        You have two options for displaying the Portalize interface to your customers. Your first option 
                        is to display a button which is fixed to the bottom of the user’s screen, which displays the the 
                        full Portalize interface through a sliding panel.  Alternatively, you can embed your own button 
                        and div element which will house the Portalize customer interface.  Please see the following links 
                        for examples of the <span><a href='http://sheltered-citadel-9273.herokuapp.com/' target="_blank">sliding interface</a> </span>
                        and the <span><a href='http://sheltered-citadel-9273.herokuapp.com/index-alt.html' target="_blank">embedded interface</a></span>.
                      </p>

                      <h3 id="sec1-1">Sliding Panel Interface</h3>
                      <p>
                        Adding Portalize to your site using the sliding panel interface is the quickest way to get started. 
                        Simply create a new instance of the <b>PortalizeSlide</b> object, passing in the name of your organization 
                        as the parameter, and the Portalize interface will be dynamically created on your site.
                      </p>
                      <pre><code className='hljs javascript'>
                        var portalize = new PortalizeSlide(‘YOUR_ORG_NAME_HERE’);
                      </code></pre>
                      <p>
                        Your organization name should match the name of the organization provided to us when your organization 
                        was created on the Portalize <span><a href='http://www.portalize.io/login/' target="_blank">login page</a></span>.
                      </p>

                      <h3 id="sec1-2">Embedded Interface</h3>
                      <p>
                        Portalize can also be added to your site by attaching specific IDs to HTML elements you manually create 
                        on your site.  This allows for greater customization of the Portalize interface, but requires a few 
                        extra steps. Begin by creating a new instance of the <b>PortalizeEmbed</b> object, passing in the name of your 
                        organization as the parameter.
                      </p>
                      <pre><code className='hljs javascript'>
                        var portalize = new PortalizeEmbed(‘YOUR_ORG_NAME_HERE’);
                      </code></pre>
                      <p>
                        Your organization name should match the name of the organization provided to us when your organization 
                        was created on the Portalize <span><a href='http://www.portalize.io/login/' target="_blank">login page</a></span>.
                      </p>
                      <p>
                        When using the embedded interface, Portalize will look for two HTML elements, a button element and a div 
                        element, to determine where to attach its event listeners and where to display the Portalize chat interface.  
                        These elements should be created and placed in your HTML file as follows:
                      </p>
                      <pre><code className='hljs html'>
                        &lt;button id="portalize-embed-init-button"&gt;Chat with a representative&lt;/button&gt;<br />
                        &lt;div id="portalize-embed-window"&gt;&lt;/div&gt;
                      </code></pre>
                      <p>
                        Please ensure that button element has an ID attribute of <i>portalize-embed-init-button</i>, and that the div 
                        element has an ID attribute of <i>portalize-embed-window</i>.  Additionally, please ensure that the 
                        <i> portalize-embed-window</i> div element does not have any children elements or text content.
                      </p>
                      <p>
                        The embedded interface will allow users to click on the <i>portalize-embed-init-button</i> element to display 
                        the Portalize user interface inside of the <i>portalize-embed-window</i> element.
                      </p>
                    

                    
                      <h2 id="sec2">Styling</h2>
                      <p>
                        Elements within the Portalize user interface are very customizable and can be styled by manipulating each 
                        element’s CSS properties through their ID selectors.  If you intend to override Portalize’s default CSS properties, 
                        please ensure that the Portalize stylesheet link is placed <b>before</b> all other stylesheet links in your HTML file.
                      </p>
                      <p>
                        Each element within Portalize’s user interface has a unique ID attribute, which is used to manipulate the CSS properties 
                        of each element using the appropriate CSS selector.  See the example interfaces below for a summary of the appropriate 
                        CSS selectors to use to change the properties of each element.  Please note that the sliding panel interface and the embedded 
                        interface have slightly different IDs for similar elements.
                      </p><hr />

                      <h5>Sliding Panel Interface</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <a href='./assets/gettingStarted/slide_form_view.png' target="_blank">
                            <img src="./assets/gettingStarted/slide_form_view.png" className="img-responsive" />
                          </a>
                        </div>
                        <div className="col-md-6">
                          <a href='./assets/gettingStarted/slide_chat_view.png' target="_blank">
                            <img src="./assets/gettingStarted/slide_chat_view.png" className="img-responsive" />
                          </a>
                        </div>
                      </div><hr />
                    
                      <h5>Embedded Interface</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <a href='./assets/gettingStarted/embed_form_view.png' target="_blank">
                            <img src="./assets/gettingStarted/embed_form_view.png" className="img-responsive" />
                          </a>
                        </div>
                        <div className="col-md-6">
                          <a href='./assets/gettingStarted/embed_chat_view.png' target="_blank">
                            <img src="./assets/gettingStarted/embed_chat_view.png" className="img-responsive" />
                          </a>
                        </div>
                      </div>
                                          
                      <h2 id="sec3">Frequently Asked Questions (FAQ)</h2>
                        <h3>What is Portalize?</h3>
                        <p>Portalize is a customer support solution that allows 
                        businesses to add video chat functionality to their websites and manage customer 
                        help requests.</p>
                        <h3>How do I implement the Portalize Chat Library on my e&#8209;commerce website?</h3>
                        <p>In order to integrate Portalize Video Chat into your e&#8209;commerce platform, 
                        one member of your company will need to create a company login account with Portalize.  
                        Additional staff members of your company wishing to interact with customers 
                        using Portalize Video Chat should sign up for an individual account linked to the 
                        company account.  Logging in will grant them access to the portal page that receives 
                        the communication feeds from your company&#39;s customers.</p>
                        <p>Additionally, in order to implement Video Chat on your customer-facing pages 
                        using the Portalize Chat Library, you will need to call our library API by inserting 
                        the following script tag into the html code of your customer pages:</p>
                        <pre><code className='hljs javascript'>
                          &lt;script src="http://portalize.io/library"&gt;&lt;/script&gt;
                        </code></pre>
                        <p>The insertion of a few additional lines of code into your html will also be necessary 
                        to render the video chat interface on your customer-facing pages.  As the particular
                        lines of code are dependent on your choice of interface, please see
                        "Getting Started -- Choosing a Customer Interface Style" for more specific instructions.
                        </p>
                        <h3>How does the customer queuing system work?</h3>
                        <p>Logged in customers wishing to speak with a support staff member are placed into a 
                        queue.  A support staff member is connected with the first waiting customer after indicating 
                        his or her availability with a button click.</p>
                        <h3>Does the Portalize Chat Library work with all browsers?</h3>
                        <p>Portalize utilizes Bootstrap for web page styling and is powered by the WebRTC API.  
                        As a result, Portalize&#39;s browser compatibility is determined by browser support for 
                        those technologies.  Currently, Portalize works with the latest versions of Chrome, 
                        Firefox and Opera.</p>
                        <h3>Can I custom style the customer-facing chat interface that is generated by the 
                        Portalize Chat Library?</h3>
                        <p>The customer-facing chat interface can be styled to match your e-commerce platform 
                        using a customized css stylesheet.</p>
                        <h3>Are Portalize&#39;s connections secure?</h3>
                        <p>The WebRTC technology utilized by Portalize allows it to offer safe, private, 
                        real-time communications.</p>
                        <h3>How much does it cost to use Portalize?</h3>
                        <p>To be determined.</p>
                                
                      <h2 id="sec4">Section 4</h2>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores 
                        eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                        sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                      </p>
                                    
                      
                </div> 
          </div>
      </div>
    )
  }
});

module.exports = AboutPage;
