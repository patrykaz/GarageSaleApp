using API.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage,
            int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            // Dodajemy do nagłówka header odpowiedzi response Paginacje, które zawierają wyżej wymienione elementy
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
            // Dodając niesdanadardowy nagłówek, musimy go dodać do A-C-E-H aby był on dostępny
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
