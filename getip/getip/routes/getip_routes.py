from flask import request, render_template, jsonify, flash
from getip import app
import re
from getip.forms.forms import URL_Form
import subprocess

@app.route('/')
def getip():
    url_form = URL_Form()
    return render_template(
        'getip/getip.html',
        url_form=url_form,
        title="Get-IP"
    )

@app.route('/get-ip-by-url', methods=['POST'])
def get_ip_by_url():
    url_form = URL_Form()

    if url_form.validate_on_submit():
        status = 'failure'
        url = url_form.url.data.strip()
        
        if 'https' in url:
            url = url[8:]

        elif 'http' in url:
            url = url[7:]
    
        command = f'dig +short {url}'

        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            shell=True
        ).stdout.decode('utf-8')
        
        ip_pattern = re.compile(
            r'((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))'
        )

        try:
            ip = ip_pattern.search(result).group()
            status = 'success'

        except AttributeError:
            ip = 'none'
            pass

        return jsonify(
            dict(
                status=status,
                ip=ip
            )
        )

    else:
        for key, value in url_form.errors.items():
            field = key
            error = value[0]

        return jsonify(
            dict(
                status='form_error',
                field=field,
                error=error
            )
        )