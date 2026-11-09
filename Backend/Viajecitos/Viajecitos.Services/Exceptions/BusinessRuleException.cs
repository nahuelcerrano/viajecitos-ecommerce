using System;
using System.Collections.Generic;
using System.Text;

namespace Viajecitos.Services.Exceptions
{
    public class BusinessRuleException : Exception
    {
        public BusinessRuleException(string message) : base(message) { }
    }
}
