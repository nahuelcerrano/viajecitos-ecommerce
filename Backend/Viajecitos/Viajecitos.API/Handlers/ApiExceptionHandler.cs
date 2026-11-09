using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Viajecitos.Services.Exceptions;

namespace Viajecitos.API.Handlers
{
    public class ApiExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var (status, titulo) = exception switch
            {
                NotFoundException => (StatusCodes.Status404NotFound, "Recurso no encontrado"),
                BusinessRuleException => (StatusCodes.Status400BadRequest, "Solicitud inválida"),
                _ => (0, string.Empty)
            };

            if (status == 0) { return false; }

            httpContext.Response.StatusCode = status;
            await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Status = status,
                Title = titulo,
                Detail = exception.Message
            }, cancellationToken);

            return true;
        }
    }
}
