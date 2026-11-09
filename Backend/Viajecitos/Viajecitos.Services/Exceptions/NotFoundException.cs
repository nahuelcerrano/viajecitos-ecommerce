using System;
using System.Collections.Generic;
using System.Text;

namespace Viajecitos.Services.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }
}
