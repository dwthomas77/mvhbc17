$(document).ready(function(){

    // Submission form style required
    $('.submission-form select').change(function(e){
        if(!$(e.target).val()){
            $('#submissionAddNew').prop("disabled", true);
        }else{
            $('#submissionAddNew').prop("disabled", false);
        }
    })

    // Judge Preference required for qualifications
    $('#id_judge_preference').parent('.form-group').addClass('has-warning');

    if($('#id_judge_preference').val() && $('#id_judge_preference').val() !== 'None'){
        $('#judgeForm').find("input[type='submit']").attr('disabled', false);
        $('#judgeRegistrationForm').find("input[type='submit']").attr('disabled', false);
    }else{
        $('#id_qualification').attr('disabled', true);
    }

    $('#id_judge_preference').change(function(e){
        $pref = $(e.target);
        console.log($pref.val());
        if($pref.val() && $pref.val() !== 'None'){
            $('#judgeRegistrationForm').find("input[type='submit']").attr('disabled', false);
            $('#judgeForm').find("input[type='submit']").attr('disabled', false);
        }
        if($pref.val() && $pref.val() === 'Judge'){
            console.log('id_qualification');
            $('#id_qualification').prop("disabled", false);
        }else{
            $('#id_qualification option').eq(1).prop('selected', true);
            $('#id_qualification').prop("disabled", true);
        }
    });

    $('#judgeForm').submit(function(){
         $('#id_qualification').prop("disabled", false);
    });

    $('#judgeRegistrationForm').submit(function(){
         $('#id_qualification').prop("disabled", false);
    });

    $('#registrationForm').submit(function(){
         $('#id_qualification').prop("disabled", false);
    });

});