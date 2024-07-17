using Application.Core;
using Application.Program.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Program.Query;

public class Catalog
{
    public class Query : IRequest<Result<CatalogDTO>> { }

    public class Handler : IRequestHandler<Query, Result<CatalogDTO>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<CatalogDTO>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var catalog = new CatalogDTO();
            catalog.Villages = await _dataContext.Villages.ToListAsync(cancellationToken);
            catalog.Stages = await _dataContext.Stages.ToListAsync(cancellationToken);
            catalog.Dates = await _dataContext.TimeTables
                .Select(x => x.StartTime!.Value.Date)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync(cancellationToken);

            return Result<CatalogDTO>.Success(catalog);
        }
    }
}
