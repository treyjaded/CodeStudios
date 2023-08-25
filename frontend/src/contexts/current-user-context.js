import { createContext } from 'react';

const CurrentUserContext = createContext({});

export default CurrentUserContext;

//The glue that binds everything else, being The provider itself , and the children of the provider.