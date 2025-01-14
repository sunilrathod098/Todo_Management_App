import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocumentation = () => {
    return (
        <div>
            <SwaggerUI url="http://localhost:5000/api-docs/swagger.json" />
        </div>
    );
};

export default SwaggerDocumentation;
