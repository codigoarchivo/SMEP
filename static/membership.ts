import { IMembership } from "../interfaces";

interface PlansData {
    plans: IMembership[];
}

export const membership: PlansData = {
    plans: [
        {
            title: 'ADICCIONES',
            price: '150$ x sesión',
        },
        {
            title: 'ARMONIZACIÓN DE CHAKRAS',
            price: '100$ x sesión',
        },
        {
            title: 'PAREJA',
            price: '100$ x sesión',
        },
        {
            title: 'SANACIÓN',
            price: '100$ x sesión'
        },
        {
            title: 'SALUD',
            price: '150$ x sesión'
        },
        {
            title: 'ENFOQUE DEPORTIVO',
            price: '150$ x sesión',
        },
    ]
}

export const membershiAge: PlansData = {
    plans: [
        {
            title: 'PLAN EMPRESARIAL',
            price: '25$/mes x 1 año',
            desc1: 'Suscripción',
            desc2: 'Publicidad',
            desc3: '2 reprogramación energética de tu marca',
        },
    ]
}