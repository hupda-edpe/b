package org.mycompany.connector;

import org.bonitasoft.engine.connector.AbstractConnector;
import org.bonitasoft.engine.connector.ConnectorValidationException;

public abstract class AbstractPostEventImpl extends AbstractConnector {

	protected final static String URL_INPUT_PARAMETER = "uRL";
	protected final static String EVENTTYPE_INPUT_PARAMETER = "eventType";
	protected final static String EVENTATTRIBUTES_INPUT_PARAMETER = "eventAttributes";
	protected final String OUTPUT1_OUTPUT_PARAMETER = "Output1";

	protected final java.lang.String getURL() {
		return (java.lang.String) getInputParameter(URL_INPUT_PARAMETER);
	}

	protected final java.lang.String getEventType() {
		return (java.lang.String) getInputParameter(EVENTTYPE_INPUT_PARAMETER);
	}

	protected final java.util.List<java.util.List> getEventAttributes() {
		return (java.util.List<java.util.List>) getInputParameter(EVENTATTRIBUTES_INPUT_PARAMETER);
	}

	protected final void setOutput1(java.lang.String output1) {
		setOutputParameter(OUTPUT1_OUTPUT_PARAMETER, output1);
	}

	@Override
	public void validateInputParameters() throws ConnectorValidationException {
		try {
			getURL();
		} catch (ClassCastException cce) {
			throw new ConnectorValidationException("uRL type is invalid");
		}
		try {
			getEventType();
		} catch (ClassCastException cce) {
			throw new ConnectorValidationException("eventType type is invalid");
		}
		try {
			getEventAttributes();
		} catch (ClassCastException cce) {
			throw new ConnectorValidationException(
					"eventAttributes type is invalid");
		}

	}

}
