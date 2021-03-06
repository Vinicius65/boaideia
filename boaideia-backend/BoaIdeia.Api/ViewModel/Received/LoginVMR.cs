﻿using BoaIdeia.Api.Services;
using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ViewModel.Received
{
    public class LoginVMR
    {
        public string Login { get; set; }

        private string _password;
        public string Password
        {
            get
            {
                return _password;
            }
            set
            {
                _password = TokenService.GetHash(value);
            }
        }
    }

    public class Login
    {
        public string Email { get; set; }
        public string Username { get; set; }
    }

   
}
