/**
 * 
 */
package org.mycompany.connector;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.bonitasoft.engine.connector.ConnectorException;


/**
 *The connector execution will follow the steps
 * 1 - setInputParameters() --> the connector receives input parameters values
 * 2 - validateInputParameters() --> the connector can validate input parameters values
 * 3 - connect() --> the connector can establish a connection to a remote server (if necessary)
 * 4 - executeBusinessLogic() --> execute the connector
 * 5 - getOutputParameters() --> output are retrieved from connector
 * 6 - disconnect() --> the connector can close connection to remote server (if any)
 */
public class PostEventImpl extends AbstractPostEventImpl {

	@Override
	protected void executeBusinessLogic() throws ConnectorException{
		//Get access to the connector input parameters
		//getURL();
		//getEventType();
		//getEventAttributes();
	
		//TODO execute your business logic here 
	

		
		// ### built the XML String ###
		// Head
		String xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
				"<Event xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"" + 
				getEventType() +
				".xsd\">\n"; 

		// iterate through all nodes
		for (int i = 0; i < getEventAttributes().size(); i++) {
			
				xml = xml + "    <" +
				getEventAttributes().get(i).get(0).toString() +
				">";
				
				// handle the case that a value is blank (e.g. no TimeStamp is specified)
				if(getEventAttributes().get(i).size() < 2){
					xml = xml + "</" +
							getEventAttributes().get(i).get(0).toString() +
							">\n";
				}
				else {
					
				// get ProcessVariables
					if (getEventAttributes().get(i).get(1).toString().startsWith("$")) {
						
						
						if (getEventAttributes().get(i).get(1).toString() == "$timestamp") {
							xml = xml + Long.toString(System.currentTimeMillis() / 1000L) +
							"</" +
							getEventAttributes().get(i).get(0).toString() +
							">\n";
						}	
								
						// TODO handle other variables
						else {
							
							
						}
						
						
					}
					else{
						xml = xml + getEventAttributes().get(i).get(1).toString() +
						"</" +
						getEventAttributes().get(i).get(0).toString() +
						">\n";
					}
					
				}
		}
		// close the Event
		xml = xml + "</Event>";
		
		System.out.println(xml);
		System.out.println(getExecutionContext().getActivityInstanceId());
		
				
		
		
		
		
		//WARNING : Set the output of the connector execution. If outputs are not set, connector fails
		//setOutput1(output1);
		
		// Test the access to ProcessID etc.
		// long activityInstanceID = getExecutionContext().getActivityInstanceId();
		// long processInstanceID = getExecutionContext().getProcessInstanceId();

		
		CloseableHttpClient client = HttpClients.createDefault();
	    HttpPost httpPost = new HttpPost(getURL());
	 
	    StringEntity entity;
		
		try {
			entity = new StringEntity(xml);
		    httpPost.setEntity(entity);
		    httpPost.setHeader("Accept", "application/xml");
		    httpPost.setHeader("Content-type", "application/xml");
		    
		    CloseableHttpResponse response = client.execute(httpPost);
		    String output1 = Integer.toString(response.getStatusLine().getStatusCode());
		    System.out.println(response.getStatusLine());
		    // set StatusCode of Output
		    setOutput1(output1);
		    // Check if Response == 200
		    System.out.println(output1);
		    assert response.getStatusLine().getStatusCode() == 200;
		    client.close();

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
		
	
	
	@Override
	public void connect() throws ConnectorException{
		//[Optional] Open a connection to remote server
	
	    
	}

	@Override
	public void disconnect() throws ConnectorException{
		//[Optional] Close connection to remote server
		
	}
}
