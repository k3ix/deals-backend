import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DealService} from "./deal.service";
import {CreateDealDto} from "./dto/create-deal.dto";
import {DealDocument} from "./deal.schema";
import {UpdateDealDto} from "./dto/update-deal.dto";

@Controller('deal')
export class DealController {
  constructor(private dealService: DealService) {}

  @Get("/all")
  getAllDeals(): Promise<DealDocument[]> {
    return this.dealService.getAllDeals()
  }


  @Post('')
  createDeal(@Body() creationData: CreateDealDto): Promise<DealDocument> {
    return this.dealService.createDeal(creationData)
  }

  @Put(":id")
  updateDeal(@Param('id') id: string, @Body() updateData: UpdateDealDto): Promise<DealDocument> {
    return this.dealService.updateDeal(id, updateData)
  }

  @Delete(":id")
  deleteDeal(@Param('id') id: string): Promise<DealDocument> {
    return this.dealService.deleteDeal(id)
  }


}
