import { observer, inject } from 'mobx-react';

const Inject = fun => component => inject(fun)(observer(component));

export default Inject
