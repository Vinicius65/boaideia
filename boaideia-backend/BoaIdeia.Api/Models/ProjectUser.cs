using BoaIdeia.Api.Constants;
using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Models
{
    public class ProjectUser
    {
        public long IdProject { get; private set; }
        public Project Project { get; private set; }
        public long IdUser { get; private set; }
        public User User { get; private set; }

        private string _typePermission;
        public string TypePermission { 
            get { return _typePermission; } 
            set {
                if (TypesOfPermissions.List.Contains(value))
                    _typePermission = value;
                else
                    throw new ArgumentException("Informe um tipo de permissão válido");
            } 
        }
        public DateTime EntryDate { get; private set; }
        public DateTime? DepartureDate { get; private set; }

        protected ProjectUser() { }
        public ProjectUser(long idUser, string typePermission)
        {
            IdUser = idUser;
            TypePermission = typePermission;
            EntryDate = DateTime.Now.Date;
        }

        public bool HasAccess() => TypesOfPermissions.List.Contains(_typePermission);
        public bool IsOwner() => TypesOfPermissions.Owner == TypePermission;
    }

  
}
