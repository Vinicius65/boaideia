using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Models
{
    public class Address
    {
        public long Id { get; private set; }
        public long IdProject { get; private set; }
        public string Neighborhood { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }
        public string Country { get; private set; }

        public TypeReachVO TypeReach { get; private set; }

        public Project Project { get; private set; }


        public Address(TypeReachEnum typeReach, string country, string neighborhood = null, string city = null, string state = null)
        {
            if (typeReach == TypeReachEnum.state && String.IsNullOrWhiteSpace(country))
                throw new ArgumentNullException("Preencha todos os campos listados: { estado, pais }");

            else if (typeReach == TypeReachEnum.city && (String.IsNullOrWhiteSpace(state) || String.IsNullOrWhiteSpace(city)))
                throw new ArgumentNullException("Preencha todos os campos listados: { cidade | estado | pais }");

            else if (typeReach == TypeReachEnum.neighborhood && (String.IsNullOrWhiteSpace(state) || String.IsNullOrWhiteSpace(city) || String.IsNullOrWhiteSpace(neighborhood)))
                throw new ArgumentNullException("Preencha todos os campos listados: { bairro | cidade | estado | pais }");

            Neighborhood = neighborhood;
            City = city;
            State = state;
            Country = country;
            TypeReach = new TypeReachVO(typeReach);
        }

        protected Address()
        {

        }
    }
}