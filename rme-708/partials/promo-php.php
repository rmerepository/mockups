<hr class="hr-in-m">

<div class="purchased-items">
		<div class="medium">
			<div> <i class="fa fa-tag"></i> &nbsp; Have a <a href="#" data-toggle="collapse" data-target="#promo-m" class="collapsed">promo code</a> or pay via <a href="#" data-toggle="collapse" data-target="#credits-m" class="collapsed">credits</a>?</div>

			<div id="promo-m" class="colpd-content oe-mar collapse" style="height: 0px;">	
                            <div class="oe-inner">                                
				<div class="pull-left">		
					<div class="medium-header">
						Promo Code
					</div>

					<div class="medium-items">
						<div class="medium-desc">Enter your promo code here</div>	
					</div>
				</div>                                
                                
                                <span id="pc_section_default" class="inline-amount gn pull-right">
                                        <div class="input-group sdo-code-input">
                                        <form action="https://members.rentmyestate.com.au/" method="post" accept-charset="utf-8" id="frmPromoCode" onsubmit="return false" _lpchecked="1"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
</div>                                            <input type="text" class="form-control sd-input" id="promocodeInp" name="promocodeInp" placeholder="Promo Code">
                                        </form>                                                <span class="input-group-btn">
                                                        <button class="btn btn-primary fa-btn" onclick="Billing.usePromocode()"><i class="fa fa-check"></i></button>
                                                </span>
                                        </div>
                                        <div class="gn-msg">
                                                <!-- <span id="pc_err_msg" class="msg">Oops. We don’t know that code</span> -->
                                                <i id="verfyLoader" class="msg lighter-text f12 hide">checking promo code...</i>
                                        </div>	
                                </span>
                                
                                <span id="pc_section_valid" class="hide inline-amount gn pull-right text-right">
                                                <div class="f16" id="promo_code"></div>	
                                                <a class="f13" href="javascript:Billing.cancelPromocode()">remove</a>
                                </span>

                                
                            </div>

			</div>
		
                        <!-- CREDIT SECTION -->
                        
			<div id="credits-m" class="colpd-content oe-mar collapse" style="height: 0px;">
                            <div class="oe-inner clearfix">	
                                <div class="pull-left">			
                                        <div class="medium-header ">
                                                My Credits 
                                        </div>
                                        <div class="medium-items pull-left">
                                                <div class="medium-desc">
                                                                                                        Aww, you have no credits
                                                                                                    </div>		
                                        </div>
                                </div>
                                
                                    <span id="cs_section_default" class="inline-amount gn pull-right">
                                            <div class="input-group sdo-code-input">
                                            <form action="https://members.rentmyestate.com.au/" method="post" accept-charset="utf-8" id="frmCredits" onsubmit="return false"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="3a7afa7001720f997d349921e0839092">
</div>                                            <input type="text" disabled="disabled" class="form-control sd-input" id="creditsInp" name="creditsInp" placeholder="credit">
                                            </form>                                                    <span class="input-group-btn">
                                                            <button disabled="disabled" class="btn btn-primary fa-btn" id="applyCredit" onclick="Billing.useCredits()"><i class="fa fa-check"></i></button>
                                                    </span>
                                            </div>
                                            <div class="gn-msg"> <!-- add class 'has-error' if invalid -->
                                                    <span class="msg hide" id="credits_msg">invalid charter</span>
                                                    <span id="verfyLoader-1" class="msg lighter-text hide f12">Applying credit...</span>
                                            </div>	
                                    </span>   
                                

                                    <span id="cs_section_valid" class="hide inline-amount gn pull-right text-right">
                                                    <div class="f16" id="credits"></div>	
                                                    <a class="f13" href="javascript:Billing.cancelCredits()">remove</a>
                                    </span>
                            </div>
                            
			</div>
			</div>
		</div>